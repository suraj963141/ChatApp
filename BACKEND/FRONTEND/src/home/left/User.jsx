import useConversation from "../../stateManage/UseConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

/* eslint-disable react/prop-types */
const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-6 py-3 hover:bg-slate-600 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src="ab.jpg" />
          </div>
        </div>

        <div>
          <div>
            <h1 className="font-bold">{user.name}</h1>
            <span className="">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
