import React, { useEffect } from "react";
import { useState } from "react";

import MessageCard from "@/components/MessageCard";
import Link from "next/link";
const Messages = () => {
  const [messages, setMessages] = useState([]);

  const getMessageStatus = async () => {
    await fetch("https://twillo-server.onrender.com/messages")
      .then((res) => res.json())
      .then((res) => setMessages(res));
  };
  useEffect(() => {
    getMessageStatus();
  }, []);
  console.log(messages);
  if (messages?.messages?.length > 0)
    return (
      <div className="p-10">
        <div className="w-full flex justify-evenly">

       <button
          className="px-5 border-[1px] border-black"
          onClick={() => {
            getMessageStatus();
          }}
          >
          REFRESH
        </button>
        <Link href={"/"}>
          <button className="px-5 border-[1px] border-black">SEND NEW MESSAGE</button>
        </Link>
          </div>
        <div className="w-full flex flex-wrap justify-around h-fit">
          {messages?.messages?.map((message) => {
            return <MessageCard message={message} />;
          })}
        </div>
       
      </div>
    );
  else
    return (
      <Link href={"/"}>
        <button>Start Sending Messages</button>
      </Link>
    );
};

export default Messages;
