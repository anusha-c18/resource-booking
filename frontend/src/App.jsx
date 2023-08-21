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
import { useAuth0 } from "@auth0/auth0-react";

export const notify = (message) => toast(message);

export function App() {
  const {
    editResourceModal,
    deleteModalVisibility,
    bookingModalVisibility,
    createResourceModalVisibility,
  } = useStateContext();

  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
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
          {/* <Client /> */}
          {/* <Admin /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
