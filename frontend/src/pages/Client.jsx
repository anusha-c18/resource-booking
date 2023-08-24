import React from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BookingModal from "../components/modals/BookingModal";
import { useStateContext } from "../lib/context";

function Client() {
  const { bookingModalVisibility } = useStateContext();
  return (
    <>
      <Outlet></Outlet>
      <AnimatePresence>
        {bookingModalVisibility ? <BookingModal /> : null}
      </AnimatePresence>
    </>
  );
}

export default Client;
