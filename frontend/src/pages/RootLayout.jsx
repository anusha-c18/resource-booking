import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const notify = (message) => toast(message);

function RootLayout() {
  return (
    <>
      {/* import nav bar based on user roles */}
      <p>nav bar</p>
      <Toaster />
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
