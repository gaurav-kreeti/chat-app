import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleChange = (e) => {
    setText(e.target.value);
    autoExpandTextarea(e.target);
    scrollToBottom();
  };
  const scrollToBottom = () => {
    const element = document.querySelector(".messages");
    element.scrollTop = element.scrollHeight;
  }
  const autoExpandTextarea = (textarea) => {
    // Reset the height to default in case the user deletes text
    const messageContainer = document.querySelector(".messages")
    textarea.style.height = 'auto';
    messageContainer.style.maxHeight = 'calc(80vh - 82px)';

    // Set the new height based on the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`;
    // let initialheight = `${textarea.scrollHeight}px`;

    // console.log(messageContainer.offsetHeight);
    // console.log(`old_height${messageContainer.offsetHeight}`);
    messageContainer.style.maxHeight = `${messageContainer.offsetHeight - textarea.scrollHeight + 38}px`
    // console.log("new_height"+messageContainer.offsetHeight);
  };
  const handleIconClick = () => {
    const file = document.getElementById("file");
    console.log(file)
    file.click();
  }
  console.log(data)
  const handleSend = async () => {
    if (!img && !text) return;
    document.querySelector("textarea").value = "";
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
              image: true
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    const docRef = doc(db, "userChats", currentUser.uid);

    const doc_data = await getDoc(docRef);
    const userChatData = doc_data.data();
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".count"]: userChatData.count ? userChatData.count + 1 : 1,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".count"]: userChatData.count ? userChatData.count + 1 : 1,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input absolute bottom-0 w-[90%] flex items-center gap-2 justify-self-end bg-[#1e1f22] pl-2 pr-2  rounded-lg">
      <div className="max-h-[100px] flex gap-2 grow items-center rounded-lg bg-[#1e1f22]">
        <textarea
          className="max-h-[90px] outline-none grow leading-4 rounded-lg p-1 bg-[#1e1f22]"
          type="text"
          style={{ resize: "none" }}
          placeholder="Type something..."
          // onChange={(e) => setText(e.target.value)}
          onChange={handleChange}
          value={text}
        />
        <i className="fa-solid fa-paperclip cursor-pointer" onClick={handleIconClick}></i>
      </div>
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          {/* <img src={Img} alt="" /> */}
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
