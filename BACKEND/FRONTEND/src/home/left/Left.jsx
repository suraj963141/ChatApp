import Search from "./Search";
import Users from "./Users";

const Left = () => {
  return (
    <div className=" w-[35%] bg-black text-gray-300">
      <h1 className="font-bold text-3xl p-2 px-11">Chats</h1>
      <Search />
      <div
        className="flex-1 overflow-y-auto "
        style={{ minHeight: "calc(84vh - 10 vh)" }}
      ></div>
      <Users />
    </div>
  );
};

export default Left;
