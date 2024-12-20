import useGetMessage from "../../context/useGetMessage.js";
import Message from "./Message";
import Loading from "../../components/Loading.jsx";
import { useEffect, useRef } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage();

  console.log(messages);

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ maxHeight: "calc(88vh - 10vh)", overflowY: "auto" }}>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            ))
          ) : (
            <div>
              <p className="text-center mt-[20%] ">
                Say! Hi to start the conversation
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
