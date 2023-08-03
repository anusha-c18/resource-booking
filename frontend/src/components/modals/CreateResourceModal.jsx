import React from "react";
import "./CreateResourceModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";

function CreateResourceModal() {
  let time = [];

  for (let i = 1; i <= 12; i++) {
    time.push(i);
  }

  const {
    availableTimeSlots,
    currentResource,
    updateCreateResourceVisibility,
    pushBooking,
  } = useStateContext();

  const closeModal = () => {
    updateCreateResourceVisibility();
  };

  const enterBooking = (event) => {
    event.preventDefault();
    pushBooking(event.target[0].value);
  };
  return (
    <motion.form
      className="createResourceModal"
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
      <div className="parallelContainer">
        <label htmlFor="resourceName">Resource Name</label>
        <input
          type="text"
          name="resourceName"
          id="resourceName"
          className="resourceName"
        />
      </div>
      {/* <p>Time Slots</p> */}
      <div className="parallelContainer">
        <label htmlFor="startTime">Start Time</label>
        <select name="startTime" id="startTime" className="slots">
          {time.map((slot) => (
            <option value={slot} key={slot + "start"}>
              {slot}
            </option>
          ))}
        </select>
        <select name="ampm" id="ampm" className="slots">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button className="book" type="submit">
        Book
      </button>
    </motion.form>
  );
}

export default CreateResourceModal;
