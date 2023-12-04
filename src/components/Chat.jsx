import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat relative flex flex-col grow p-2 border-solid border-l-2 border-black">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
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