import React from "react";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export const notify = (message) => toast(message);

function RootLayout() {
  return (
    <>
      {/* only show navbar if logged in - import nav bar based on user roles */}
      {/* profile pic and logout */}
      <p>nav bar</p>
      <Toaster />
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
