import React from "react";
import { convertIsoToPlainDateTime } from "../utils/helper.js";
const MessageCard = ({ message }) => {
  return (
    <div className="w-fit h-fit p-2 border-[1px] border-black shadow-lg m-3">
      <p>
        {" "}
        <span className="font-[800] ">ID :</span>
        {message?.sid}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">TIME :</span>
        {convertIsoToPlainDateTime(message?.createdAt)}
      </p>

      <p>
        {" "}
        <span className="font-[800] ">FROM :</span>
        {message?.sender} , {message?.senderNumber}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">TO:</span> {message?.receiver} ,{" "}
        {message?.to}
      </p>
      <p className=" text-ellipsis overflow-clip">
        {" "}
        <span className="font-[800] ">MESSAGE:</span> {message?.body}
      </p>
      <p className=" text-ellipsis overflow-clip">
        {" "}
        <span className="font-[800] ">VIDEO:</span> {message?.videoUrl}
      </p>
      <p>
        {" "}
        <span className="font-[800] ">STATUS:</span> {message?.status} , {convertIsoToPlainDateTime(message?.updatedAt)}
      </p>
    </div>
  );
};

export default MessageCard;
