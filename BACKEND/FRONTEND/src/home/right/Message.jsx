/* eslint-disable react/prop-types */
const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-blue-500" : "";
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message} <span className="text-xs">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
