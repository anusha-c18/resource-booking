import { useState } from "react";
import "./App.css";
import AvailableResources from "./components/client/AvailableResources";
import BookingModal from "./components/modals/bookingModal";
import { useStateContext } from "./lib/context";
import { AnimatePresence } from "framer-motion";
import Client from "./pages/client";
import Admin from "./pages/admin";
import CreateResourceModal from "./components/modals/CreateResourceModal";
import toast, { Toaster } from "react-hot-toast";

const notify = (message) => toast(message);

function App() {
  const { bookingModalVisibility, createResourceModalVisibility } =
    useStateContext();
  return (
    <>
      <Toaster />
      <AnimatePresence>
        {bookingModalVisibility ? <BookingModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {createResourceModalVisibility ? <CreateResourceModal /> : null}
      </AnimatePresence>
      {/* <Client /> */}
      <Admin />
    </>
  );
}

export { notify, App };
