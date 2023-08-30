import React from "react";
import "./BookingModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";
import Loading from "./../../../public/images/loading.gif";

function BookingModal() {
  const {
    availableTimeSlots,
    currentResource,
    updateBookingModalVisibility,
    pushBooking,
    pushingToDb,
  } = useStateContext();

  const closeModal = () => {
    updateBookingModalVisibility();
  };

  const enterBooking = (event) => {
    event.preventDefault();
    pushBooking(event.target[0].value);
  };

  return (
    <motion.form
      className="bookingModal"
      onSubmit={enterBooking}
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      key="bookingModal"
    >
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
      <p className="bookResourceName">{currentResource}</p>
      <div className="bookingParallel">
        <label htmlFor="startTime">Slot</label>
        <select name="startTime" id="startTime" className="slot">
          {availableTimeSlots.map((slot) => (
            <option
              value={slot[0] + " - " + slot[1]}
              key={slot[0] + " - " + slot[1] + " " + currentResource}
            >
              {slot[0] + " - " + slot[1]}
            </option>
          ))}
        </select>
      </div>
      {pushingToDb ? (
        <img src={Loading} alt="please wait" />
      ) : (
        <button className="book" type="submit">
          Book
        </button>
      )}
    </motion.form>
  );
}

export default BookingModal;
