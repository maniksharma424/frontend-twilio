import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      phoneNumber,
      message,
    };

    if (phoneNumber.length === 10 && message.length > 0) {
      try {
        const response = await fetch(
          "https://twillo-server.onrender.com/sendmessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Request error:", error);
      }
    } else {
      alert("Invalid phoneNumber or message");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-1/2 h-1/3 p-5 border-[1px] border-black flex flex-col justify-around items-start"
        onSubmit={handleSubmit}
      >
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-[1px] border-black w-full p-1 "
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-[1px] border-black w-full p-1 "
          />
        </label>
        <br />
        <div className="w-full flex justify-around">
          <button className="px-5 border-[1px] border-black" type="submit">
            Send Message
          </button>
          <Link href={"/Messages"}>
            <button className="px-5 border-[1px] border-black" >See all messages</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
