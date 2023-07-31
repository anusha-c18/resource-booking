import React from "react";
import "./BookingModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";

function BookingModal() {
  const { availableTimeSlots, currentResource, updateBookingModalVisibility } =
    useStateContext();

  const closeModal = () => {
    updateBookingModalVisibility();
  };

  const enterBooking = (event) => {
    event.preventDefault();
  };

  return (
    <form className="bookingModal" onSubmit={enterBooking}>
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
      <div className="parallel">
        <label htmlFor="startTime">Slot</label>
        <select name="startTime" id="startTime" className="slot">
          {availableTimeSlots.map((slot) => (
            <option value={slot[0] + " - " + slot[1]}>
              {slot[0] + " - " + slot[1]}
            </option>
          ))}
        </select>
      </div>
      <button className="book" type="submit">
        Book
      </button>
    </form>
  );
}

export default BookingModal;
