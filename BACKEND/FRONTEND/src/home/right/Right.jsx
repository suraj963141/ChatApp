import { useEffect } from "react";
import useConversation from "../../stateManage/UseConversation.js";
import Chatuser from "./Chatuser";
import Type from "./Type";
import { useAuth } from "../../context/AuthProvider.jsx";
import Messages from "./Messages";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      <div className="w-full bg-slate-900 text-gray-300">
        <div>
          {!selectedConversation ? (
            <Nochat />
          ) : (
            <>
              <Chatuser />
              <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: "calc(88vh - 8vh)" }}
              >
                <Messages />
              </div>
              <Type />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Right;

const Nochat = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center ">
          {" "}
          Welcome{" "}
          <span className=" font-semibold text-xl">{authUser.user.name}</span>
          <br /> Select a chat to start a messaging.
        </h1>
      </div>
    </>
  );
};
