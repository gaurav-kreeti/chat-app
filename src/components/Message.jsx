import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { updateDoc,doc } from "firebase/firestore";
import { db } from "../firebase";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    updateCount();
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const updateCount= async ()=>{
    console.log(currentUser.uid + " "+ data.user.uid);  
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".count"]: 0,
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".count"]: 0,
    })
  }
  
  return (
    <div
      ref={ref}
      className={`flex items-center pb-1 ${message.senderId === currentUser.uid && "flex-row-reverse justify-start "}`}
    >
      <div className="messageInfo">
        <img width="40px"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />    
      </div>
      <div className={`messageContent break-words max-w-[300px] rounded-lg ${!message.img && message.senderId === currentUser.uid && "bg-[#644ef3]"} ${!message.img && message.senderId !== currentUser.uid && "bg-[#1e1f22]"}`}>
        <p className="p-2">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;