import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="w-52 h-44 p-2 border-[1px] border-black shadow-lg m-3">
      <p>From : {message?.from}</p>
      <p> To : {message?.to}</p>
      <p> Message : {message?.body}</p>
      <p> Status : {message?.status}</p>
    </div>
  );
};

export default MessageCard;
