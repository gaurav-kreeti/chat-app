import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const handleBack = ()=>{
    document.querySelector(".chat").style.display = "none";
    document.querySelector(".chats").style.display = "flex";
    document.querySelector(".search").style.display = "block";
    document.querySelector(".chat-container").style.display = "block";
    document.querySelector(".chat-search-container").style.display = "block";
  }
  return (
    <div className="chat hidden relative sm:flex sm:w-100 flex-col grow p-2 border-solid border-l-2 border-black  bg-[#2b2d31]">
      <div className="chatInfo">
      <i className="inline sm:hidden fa-solid fa-arrow-left" onClick={handleBack}></i>
        { data.chatId!=='null' &&
          <span className="ml-2">Chatting with {data.user?.displayName}</span>
        }
      </div>
      <div className=" grow flex flex-col justify-between">
      {data.chatId==='null' && 
        <h3 className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl">Welcome to Chat APP</h3>
      }
      {
        data.chatId !== 'null' &&
        <>
          <Messages />
          <Input/>
        </>
      }
      </div>
    </div>
  );
};

export default Chat;