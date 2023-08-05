import React from "react";
import "./ExistingResource.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../../lib/context";

function ExistingResource({ resource }) {
  const { updateCurrentResource, updateDeleteModalVisibility } =
    useStateContext();

  const toggleDeleteModal = () => {
    updateCurrentResource(resource);
    updateDeleteModalVisibility();
  };

  return (
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 9,
        duration: 0.6,
      }}
      className="resource"
    >
      {resource}
      <div className="parallel">
        <button className="edit button">Edit</button>
        <button className="delete button" onClick={toggleDeleteModal}>
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default ExistingResource;
