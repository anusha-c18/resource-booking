import React from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../lib/context";
import { AnimatePresence } from "framer-motion";
import DeleteModal from "../components/modals/DeleteModal";
import EditModal from "../components/modals/EditModal";
import CreateResourceModal from "../components/modals/CreateResourceModal";

function Admin() {
  const {
    createResourceModalVisibility,
    deleteModalVisibility,
    editResourceModal,
    role,
  } = useStateContext();

  if (role === "admin") {
    return (
      <>
        <AnimatePresence>
          {createResourceModalVisibility ? <CreateResourceModal /> : null}
        </AnimatePresence>
        <AnimatePresence>
          {deleteModalVisibility ? <DeleteModal /> : null}
        </AnimatePresence>
        <AnimatePresence>
          {editResourceModal ? <EditModal /> : null}
        </AnimatePresence>
        <Outlet></Outlet>
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

export default Admin;
