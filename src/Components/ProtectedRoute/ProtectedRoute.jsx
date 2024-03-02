import React from "react";
import { Navigate } from "react-router-dom";

export default  function ProtectedRoute ({children}) {
    if (localStorage.getItem("tkn") == undefined) {
      return <Navigate to="/Login" />;
    }
  return <>
  {children}
  </>;
}
