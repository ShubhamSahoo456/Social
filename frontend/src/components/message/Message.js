import React from "react";
import { format } from "timeago.js";
import "./message.css";

const Message = ({ own, Chat, senderProfilepic, receiverProfilepic }) => {
  return (
    <>
      <div className={own ? "messager own" : "messager"}>
        <div className="messageTop">
          <img
            className="messageTop_img"
            src={own ? receiverProfilepic : senderProfilepic}
          />
          <a className="messageText">{Chat.text}</a>
        </div>
        <div className="messageBottom">{format(Chat.createdAt)}</div>
      </div>
    </>
  );
};

export default Message;
