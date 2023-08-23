import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../lib/UserContext";

function PrivateRoute({ children }) {
  console.log(children);
  const { myUser } = useUserContext();
  return myUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
