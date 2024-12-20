import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";
import { useState } from "react";

const Type = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed bottom-0 left-30 w-[50%]  py-2 px-4 flex items-center space-x-2">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            type="text"
            placeholder="Type a message..."
            className="flex-grow border-[1px] border-gray-700 rounded-full px-4 py-6 bg-slate-900 text-white outline-none"
            style={{ maxHeight: "3rem" }}
          />
          <button className="text-2xl text-white p-3 rounded-full bg-green-500 hover:bg-greeen-800 transition">
            <IoMdSend />
          </button>
        </div>
      </form>
    </>
  );
};

export default Type;
