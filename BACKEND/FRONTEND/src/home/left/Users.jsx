import useGetAllUsers from "../../context/userGetAllUser";
import User from "./User";

const Users = () => {
  const [allUsers] = useGetAllUsers();
  console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>

      <div
        style={{ maxHeight: "calc(84vh - 10vh)" }}
        className="my-2 flex-1 overflow-y-auto"
      >
        {allUsers.map((user, index) => {
          return <User key={index} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Users;
