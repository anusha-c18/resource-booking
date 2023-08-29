import React from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BookingModal from "../components/modals/BookingModal";
import { useStateContext } from "../lib/context";
import NewUser from "../components/modals/NewUser";

function Client() {
  const { bookingModalVisibility, role, newUserVisibility } = useStateContext();
  if (role === "client") {
    return (
      <>
        <Outlet></Outlet>
        <AnimatePresence>
          {bookingModalVisibility ? <BookingModal /> : null}
        </AnimatePresence>
        {newUserVisibility ? <NewUser /> : null}
      </>
    );
  } else {
    return (
      <>
        <p className="accessDenied">
          Sorry, you don't have access to this page!
        </p>
      </>
    );
  }
}

export default Client;
