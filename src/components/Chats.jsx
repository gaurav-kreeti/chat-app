import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data,dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);
  
  const handleSelect = async (u) => {
    if(screen.width<=640){
      document.querySelector(".chat").style.display = "flex";
      document.querySelector(".chats").style.display = "none";
      document.querySelector(".search").style.display = "none";
      document.querySelector(".chat-container").style.display = "flex";
    }
    
    // console.log(document.querySelector(".chats").offSetWidth);
    dispatch({ type: "CHANGE_USER", payload: u[1].userInfo });
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [u[0] + ".count"]: 0,
    })
    await updateDoc(doc(db,"userChats",u[1].userInfo.uid),{
      [u[0] + ".count"]: 0,
    })
    console.log(u)
    // await updateDoc(doc(db,"userChats"))
  };
  const handleLastMessage = (data) =>{
    console.log(data)
    if(data){
      if(data.lastMessage?.text === "" && data.lastMessage?.image == true){
        return currentUser.uid == data.userInfo?.uid ? "Photo recieved" :  "You sent a photo";
      }
      else{
        return data.lastMessage?.text
      }
    }
    return "";
  }
  return (
    <div className="chats flex flex-col">
      <h1 className="pt-2 text-center">Your Chats</h1>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          key={chat[0]}
          onClick={() => handleSelect(chat)}
        >
          <img width = "50px" src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <strong>{chat[1].userInfo.displayName}</strong>
            <p className="text-sm text-gray-500 truncate max-w-[150px]">{
              handleLastMessage(chat[1])
            }</p>
            
          </div>
          {console.log(data.chatId)}
          {console.log(chat[1])}
          {
          (data.chatId =="null" || data.chatId != chat[0]) && chat[1].count !=0 &&
          <div className="ml-auto mr-2">
          <span className="text-sm rounded-sm p-1 bg-red-600">{chat[1].count}</span>  
          </div>
          }
        </div>
      ))}
      <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
        <div
          className="flex items-center cursor-pointer mt-2 hover:bg-[#2b2d31]"
          // key={chat[0]}
          // onClick={() => handleSelect(chat)}
        >
          <img width="50px" src="src/assets/profile.png" alt="" />
        </div>
    </div>
    
  );
};

export default Chats;