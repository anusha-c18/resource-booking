import React from "react";
import "./BookingModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";

function BookingModal() {
  const { currentResource, updateBookingModalVisibility } = useStateContext();
  const closeModal = () => {
    updateBookingModalVisibility();
  };
  return (
    <div className="bookingModal">
      <motion.p
        className="closeModal"
        onClick={closeModal}
        whileHover={{ scale: 1.1 }}
        key="errorCloser"
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        x
      </motion.p>
      <p className="resourceName">{currentResource}</p>
      <select name="startTime" id="startTime">
        <option value={}>{}</option>
      </select>
    </div>
  );
}

export default BookingModal;
