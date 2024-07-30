import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export let authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [Token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  let token;

  useEffect(function () {
    if (Cookies.get("tkn")) {
      token = Cookies.get("tkn");
      setToken(token);
      setUserInfo(jwtDecode(token));
      getUserData();
    } else {
      token = null;
    }
  }, []);

  function getUserData() {
    const userInfo = jwtDecode(Cookies.get("tkn"));
    setUserInfo(userInfo);
  }

  return (
    <authContext.Provider
      value={{
        Token,
        setToken,
        getUserData,
        userInfo,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
