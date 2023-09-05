import Link from "next/link";
import { useRef, useState } from "react";
export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [name, setname] = useState("");
  const [sending, setSending] = useState(false);
  const mediaRef = useRef(null);
  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();

    if (
      phoneNumber.length === 10 &&
      message.length > 0 &&
      name.length > 1 &&
      media !== null
    ) {
      try {
        const videoFormData = new FormData();
        videoFormData.append("file", media);
        videoFormData.append("upload_preset", "s8ajszzz");

        const videoResponse = await fetch(
          "https://api.cloudinary.com/v1_1/du19shvhf/video/upload",
          {
            method: "POST",
            body: videoFormData,
          }
        );
        const videoData = await videoResponse.json();
        const video_URL = await videoData.secure_url;

        const response = await fetch("https://twillo-server.onrender.com/sendMediaMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            video_URL,
          }),
        });
        const messageResponse = await fetch(
          "https://twillo-server.onrender.com/sendmessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber,
              message,
              name,
            }),
          }
        );

        if (response.ok && messageResponse.ok) {
          const responseData = await response.json();
          setMessage("");
          setPhoneNumber("");
          setSending(false);
          setname("");
          mediaRef.current.value = null;
        } else {
          console.error(
            "Request failed with status:",
            response.status,
            messageResponse.status
          );
          alert(response.status);
          setSending(false);
        }
      } catch (error) {
        console.error("Request error:", error);
        alert("Request error:", error);
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
          className="w-1/2 h-3/5 p-5 border-[1px] border-black flex flex-col justify-around items-start"
          onSubmit={handleSubmit}
        >
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="border-[1px] border-black w-full p-1 "
            />
          </label>
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
          <label>
            Video:
            <input
              type="file"
              name="media"
              ref={mediaRef}
              accept=".mp4,.avi,.mpg"
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
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
