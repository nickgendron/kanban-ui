import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
export default function PrivateRoutes({ children }) {

  const authenticated = useSelector((state) => state.userState.authenticated);

  console.log("private route")
  if (authenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
