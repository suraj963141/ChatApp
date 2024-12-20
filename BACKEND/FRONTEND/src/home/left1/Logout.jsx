import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Logout = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout");
    }
  };
  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button>
          <CiLogout
            onClick={handleLogout}
            className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default Logout;
