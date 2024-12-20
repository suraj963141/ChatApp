/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialUserState;

  // Safely get and parse user state from cookies or localStorage
  try {
    // eslint-disable-next-line no-unused-vars
    const jwt = Cookies.get("jwt") || localStorage.getItem("ChatApp");
  } catch (error) {
    console.error("Error parsing stored user state:", error);
    initialUserState = undefined;
  }

  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
