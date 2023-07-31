import React from "react";
import "./BookingModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";

function BookingModal() {
  const { updateBookingModalVisibility } = useStateContext();
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
    </div>
  );
}

export default BookingModal;
