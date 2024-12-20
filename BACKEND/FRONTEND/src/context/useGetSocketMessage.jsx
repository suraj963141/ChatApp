import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/UseConversation.js";
import { useEffect } from "react";
import sound from "../assets/notifi.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { message, setMessages } = useConversation();

  useEffect(() => {
    const notification = new Audio(sound);
    notification.play();
    socket.on("newMessage", (newMessage) => {
      // eslint-disable-next-line no-undef
      setMessages(...Messages, newMessage);
    });
    return () => socket.off("newMessage");
  }, [socket, message, setMessages]);
};

export default useGetSocketMessage;
