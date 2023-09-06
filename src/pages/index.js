import {
  setFromName,
  addRecipent,
  setFromPhoneNumber,
  setMedia,
  setMessage,
  handleRecipientNameChange,
  handleRecipientPhoneNumberChange,
} from "@/redux/previewSlice";
import Link from "next/link";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const { fromName, fromPhoneNumber, message, media, recipients } = useSelector(
    (store) => store.previewSlice
  );
  const dispatch = useDispatch();

  const mediaRef = useRef(null);

  

  const recipientNameChange = (e, index) => {
    const updatedRecipients = [...recipients];

    updatedRecipients[index] = {
      ...updatedRecipients[index],
      name: e.target.value,
    };

    dispatch(handleRecipientNameChange(updatedRecipients));
  };


  const recipientNumberChange = (e, index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index] = {
      ...updatedRecipients[index],
      phoneNumber: e.target.value,
    };
    dispatch(handleRecipientPhoneNumberChange(updatedRecipients));
  };

  
  return (
    <div>
      <h1 className="text-[30px] font-[500]w w-full flex justify-center">
        <p>Neon Flake </p>
      </h1>
      <div className="w-full h-screen flex justify-center items-center">
        <form
          className="w-2/4 h-4/5 overflow-scroll p-5 border-[1px] border-black flex flex-col justify-around items-start text-[14px] font-[300]"
        >
          {/* Sender's Information */}
          <h1 className="font-[800] text-[20px]">From</h1>
          <div className="w-4/5 flex justify-between">
            <label>
              Name
              <input
                type="text"
                name="fromName"
                placeholder="Enter sender's name"
                value={fromName}
                onChange={(e) => dispatch(setFromName(e.target.value))}
                className="border-[1px] border-black w-full p-1 "
              />
            </label>
            <label>
              Phone Number
              <input
                type="text"
                name="fromPhoneNumber"
                placeholder="Enter sender's phone number "
                value={fromPhoneNumber}
                onChange={(e) => dispatch(setFromPhoneNumber(e.target.value))}
                className="border-[1px] border-black w-full p-1 "
              />
            </label>
          </div>

          {/* Recipients */}
          <h1 className="font-[800] text-[20px]">To</h1>
          <ul className=" w-4/5 h-[160px] overflow-y-auto p-3 border-[1px] border-black ">
            {recipients.map((recipient, index) => (
              <li
                key={index}
                id="recipient-row"
                className="w-full flex  justify-between py-3"
              >
                <label>
                  Name
                  <input
                    type="text"
                    placeholder="Enter recipient name"
                    name={`name-${index}`}
                    value={recipient.name}
                    onChange={(e) => recipientNameChange(e, index)}
                    className="border-[1px] border-black w-full p-1 "
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    type="text"
                    placeholder="Enter recipient phone number"
                    name={`toPhoneNumber-${index}`}
                    value={recipient.phoneNumber}
                    onChange={(e) => recipientNumberChange(e, index)}
                    className="border-[1px] border-black w-full p-1 "
                  />
                </label>
              </li>
            ))}
          </ul>

          {/* Add Recipient Button */}
          <button
            className="px-5 p-1 border-[1px] border-black"
            type="button"
            onClick={() => {
              dispatch(addRecipent());
            }}
          >
            Add Recipient
          </button>

          {/* Message */}
          <label className="w-full">
            Message (200 characters):
            <textarea
              type="text"
              name="message"
              placeholder="Enter message"
              value={message}
              onChange={(e) => dispatch(setMessage(e.target.value))}
              className="border-[1px] border-black w-full h-24 p-1 "
            />
          </label>

          {/* Media Input */}
          <label>
            Media:
            <input
              type="file"
              name="media"
              ref={mediaRef}
              accept=".mp4,.avi,.mpg"
              onChange={(e) => {
                dispatch(setMedia(e.target.files[0]));
              }}
              className="border-[1px] border-black w-full p-1 "
            />
          </label>


          <Link   href={"/Preview"}>
            <button
            disabled = {recipients.length <=0 ? true : false}
            className=" px-5 border-[1px] border-black">
              Preview
            </button>
          </Link>
          <Link   href={"/Messages"}>
            <button
            className=" px-5 border-[1px] border-black">
              View Sent Messages
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
