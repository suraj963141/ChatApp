import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  // eslint-disable-next-line no-unused-vars
  const [authUser, updateAuthState] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  // Validate password match
  const validatePasswordMatch = (value) =>
    value === password || "Password and confirm password don't match";

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);

      if (response.data) {
        toast.success("Signup successful! You can now log in.");
        
      }
      localStorage.setItem("messenger", JSON.stringify(response.data))
    } catch (error) {
      toast.error(
        "Error: " + (error.response?.data || "Something went wrong.")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-start mb-6">
          <h1 className="text-blue-600 font-bold text-3xl">Messenger</h1>
          <h2 className="text-gray-700 text-xl mt-2">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md">
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              placeholder="Username"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </label>
          {errors.name && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.name.message}
            </span>
          )}

          {/* Email */}
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.email.message}
            </span>
          )}

          {/* Password */}
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </label>
          {errors.password && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}

          {/* Confirm Password */}
          <label className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: validatePasswordMatch,
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
