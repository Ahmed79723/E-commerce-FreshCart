import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!Cookies.get("tkn")) {
    return <Navigate to="/Login" />;
  }
  return <>{children}</>;
}
