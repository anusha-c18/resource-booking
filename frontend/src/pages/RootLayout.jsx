import React from "react";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import NavBar from "../components/navBar/NavBar";
import { useUserContext } from "../lib/UserContext";

export const notify = (message) => toast(message);

function RootLayout() {
  const { myUser } = useUserContext();
  return (
    <>
      {myUser != null ? <NavBar /> : null}
      <Toaster />
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
