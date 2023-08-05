import React from "react";
import "./ExistingResource.css";
import { motion } from "framer-motion";

function ExistingResource({ resource }) {
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
        <button className="delete button">Delete</button>
      </div>
    </motion.div>
  );
}

export default ExistingResource;
