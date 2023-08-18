import { useState } from "react";
import "./App.css";
import BookingModal from "./components/modals/BookingModal";
import { useStateContext } from "./lib/context";
import { AnimatePresence } from "framer-motion";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import CreateResourceModal from "./components/modals/CreateResourceModal";
import toast, { Toaster } from "react-hot-toast";
import DeleteModal from "../src/components/modals/DeleteModal";
import EditModal from "./components/modals/EditModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

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
      <BrowserRouter>
        <Routes>
          {/* <Toaster /> */}
          {/* <AnimatePresence>
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
          </AnimatePresence> */}
          <Route index element={<Login />} />
          {/* <Client /> */}
          {/* <Admin /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
