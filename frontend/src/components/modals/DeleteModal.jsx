import React from "react";
import { useStateContext } from "../../lib/context";
import { motion } from "framer-motion";
import "./DeleteModal.css";
import Loading from "../../../public/images/loading.gif";

function DeleteModal() {
  const {
    resourceDeletion,
    currentResource,
    updateDeleteModalVisibility,
    deletingResource,
  } = useStateContext();

  const closeModal = () => {
    updateDeleteModalVisibility();
  };

  const deleteResource = (event) => {
    event.preventDefault();
    resourceDeletion(currentResource);
  };

  return (
    <motion.div
      className="warningModal"
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      key="warningModal"
    >
      <motion.p
        className="closeModal"
        onClick={closeModal}
        whileHover={{ scale: 1.1 }}
        key="warningCloser"
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        x
      </motion.p>
      <p className="warningMessage">
        Are you sure you want to delete the resource{" "}
        <span className="resourceTitle">{currentResource}</span>?
      </p>
      <div className="bookingParallel">
        {deletingResource ? (
          <img src={Loading} alt="pushing to db" className="loadingGIF" />
        ) : (
          <button className="book" type="submit" onClick={closeModal}>
            Cancel
          </button>
        )}
        {deletingResource ? (
          <img src={Loading} alt="pushing to db" className="loadingGIF" />
        ) : (
          <button className="book" type="submit" onClick={deleteResource}>
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default DeleteModal;
