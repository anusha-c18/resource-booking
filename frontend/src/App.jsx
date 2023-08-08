import { useState } from "react";
import "./App.css";
import BookingModal from "./components/modals/bookingModal";
import { useStateContext } from "./lib/context";
import { AnimatePresence } from "framer-motion";
import Client from "./pages/client";
import Admin from "./pages/Admin";
import CreateResourceModal from "./components/modals/CreateResourceModal";
import toast, { Toaster } from "react-hot-toast";
import DeleteModal from "../src/components/modals/DeleteModal";
import EditModal from "./components/modals/EditModal";

export const notify = (message) => toast(message);

export function App() {
  const {
    editResourceModal,
    deleteModalVisibility,
    bookingModalVisibility,
    createResourceModalVisibility,
  } = useStateContext();
  return (
    <>
      <Toaster />
      <AnimatePresence>
        {bookingModalVisibility ? <BookingModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {createResourceModalVisibility ? <CreateResourceModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {deleteModalVisibility ? <DeleteModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {editResourceModal ? <EditModal /> : null}
      </AnimatePresence>
      <Client />
      {/* <Admin /> */}
    </>
  );
}
