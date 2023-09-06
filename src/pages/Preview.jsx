import { clear } from "@/redux/previewSlice";
import { useRouter } from "next/router";
import { fromJSON } from "postcss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Preview = () => {
  const { fromName, fromPhoneNumber, message, media, recipients } = useSelector(
    (store) => store.previewSlice
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    if (
      fromPhoneNumber.length === 10 &&
      message.length > 0 &&
      fromName.length > 1 &&
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

        const response = await fetch(
          "https://twillo-server.onrender.com/sendmessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: fromName,
              senderNumber: fromPhoneNumber,
              message: message,
              video_URL: video_URL,
              recipients: recipients,
            }),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          dispatch(clear());
          router.push("/Messages");
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
    <div className="p-[50px]">
      <div id="preview-container" className="w-full h-fit flex ">
        <div className="w-1/2 h-fit flex flex-col justify-around items-start ">
          <p>
            <span className="font-[800]">Sender :</span>
            {fromName} , {fromPhoneNumber}
          </p>

          {recipients?.map((recipient) => {
            return (
              <p>
                <span className="font-[800]">To :</span>
                {recipient?.name} , {recipient?.phoneNumber}
              </p>
            );
          })}
        </div>
        <div className="w-1/2 h-fit flex flex-col justify-around items-center p-10">
          {media ? (
            <video controls width="400" className="rounded-lg">
              <source src={URL.createObjectURL(media)} type={media.type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
          <p className="mt-5">
            <span className="font-[800]">MESSAGE:</span>
            {message}
          </p>
        </div>
      </div>
      <div className="w-full h-fit p-4 flex flex-col">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="border-[1px] w-1/6 my-1 border-black px-5 p-2 rounded-sm"
        >
          SEND
        </button>
        <Link href={"/"}>
          <button className="border-[1px] w-1/6 my-1 border-black px-5 p-2 rounded-sm">
            EDIT
          </button>
        </Link>
        <Link href={"/Messages"}>
          <button className="border-[1px] w-1/6 my-1 border-black px-5 p-2 rounded-sm">
            VIEW SENT MESSAGES
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Preview;
