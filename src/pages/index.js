import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    setSending(true);
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
          setMessage("");
          setPhoneNumber("");
          setSending(false);
        } else {
          console.error("Request failed with status:", response.status);
          setSending(false);
        }
      } catch (error) {
        console.error("Request error:", error);
        setSending(false);
      }
    } else {
      alert("Invalid phoneNumber or message");
      setSending(false);
    }
  };

  return (
    <>
      <h1 className="text-[30px] font-[500]w w-full flex justify-center">
        <p>Test whatsapp Messages</p>
      </h1>
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
              {sending ? <p>sending....</p> : <p> Send Message</p>}
            </button>
            <Link href={"/Messages"}>
              <button className="px-5 border-[1px] border-black">
                See all messages
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
