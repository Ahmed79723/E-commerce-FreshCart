import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [Token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  let token;

  useEffect(function () {
    if (localStorage.getItem("tkn")) {
      token = localStorage.getItem("tkn");
      setToken(token);
      setUserInfo(jwtDecode(token));
      getUserData();
      // console.log(token, Token);
    } else {
      token = null;
    }
  }, []);

  function getUserData() {
    const userInfo = jwtDecode(localStorage.getItem("tkn"));
    setUserInfo(userInfo);
    console.log(userInfo);
  }
  //   if (token == undefined) {
  //     return <AuthLayout />;
  //   }
  return (
    <authContext.Provider
      value={{
        Token,
        setToken,
        getUserData,
        userInfo,
      }}
    >
      {/* {(Token||token)? {children}:<AuthLayout/>} */}
      {children}
    </authContext.Provider>
  );
}
