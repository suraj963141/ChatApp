import Left from "./home/left/Left";
import Logout from "./home/left1/Logout";
import Right from "./home/right/Right";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

const App = () => {
  const [authuser] = useContext(AuthContext);
  console.log(authuser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
