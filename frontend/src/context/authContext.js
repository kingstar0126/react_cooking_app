import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  error: "",
  user: "",
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  // CHECK FOR TOKEN ON INITIAL LOAD AND ADD IT TO GLOBAL STATE
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      setIsLoggedIn(true);
      setUser(loggedUser);
    }
  }, []);

  // LOGIN USER
  const login = async (userData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Невалидни имейл или парола");
      }

      if (response.status === 200) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        error: error,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
