import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div
      ref={ref}
      className={`flex items-center ${message.senderId === currentUser.uid && "flex-row-reverse justify-start"}`}
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
      <div className="messageContent break-words max-w-[200px]">
        <p className="p-2">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;