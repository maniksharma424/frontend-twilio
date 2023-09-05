import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="w-52 h-44 p-2 border-[1px] border-black shadow-lg m-3">
      <p>
        {" "}
        <span className="font-[800] ">From :</span>
        {message?.from}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">To:</span> {message?.to}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">Message:</span> {message?.body}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">Status:</span> {message?.status}
      </p>
    </div>
  );
};

export default MessageCard;
