import React from "react";
import "./IndividualResource.css";
import { useStateContext } from "../../../lib/context";
import { motion } from "framer-motion";

function IndividualResource({ resourceName }) {
  const {
    currentResource,
    updateCurrentResource,
    updateBookingModalVisibility,
    updateAvailableTimeSlots,
  } = useStateContext();

  const renderModal = () => {
    updateCurrentResource(resourceName);
    updateAvailableTimeSlots(resourceName);
    updateBookingModalVisibility();
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
      className="individualResource"
      onClick={renderModal}
    >
      <p>{resourceName}</p>
    </motion.div>
  );
}

export default IndividualResource;
