import React, { useEffect } from "react";
import "./CreateResourceModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";
import Loading from "../../../public/images/loading.gif";
import { notify } from "../../App";

function CreateResourceModal() {
  let time = [];

  for (let i = 1; i <= 12; i++) {
    time.push(i);
  }

  const {
    uniqueExistingResources,
    pushingToDb,
    updateCreateResourceVisibility,
    createNewResource,
  } = useStateContext();

  const closeModal = () => {
    updateCreateResourceVisibility();
  };

  const createResource = (event) => {
    event.preventDefault();
    if (uniqueExistingResources.includes(event.target[0].value.trim())) {
      notify("Resource with this name already exists!");
    } else if (
      event.target[1].value == event.target[3].value &&
      event.target[2].value == event.target[4].value
    ) {
      notify("Start and End time of resource usage can not be the same!");
    } else if (
      event.target[2].value == event.target[4].value &&
      event.target[1].value > event.target[3].value
    ) {
      notify("End Time can not be before Start Time");
    } else {
      let resource = {};
      resource.resource = event.target[0].value;
      if (event.target[2].value == "PM") {
        resource.startTime = parseInt(event.target[1].value) + 12 + "";
      } else {
        resource.startTime = event.target[1].value;
      }
      if (event.target[4].value == "PM") {
        resource.endTime = parseInt(event.target[3].value) + 12 + "";
      } else {
        resource.endTime = event.target[3].value;
      }
      createNewResource(resource);
    }
  };

  return (
    <motion.form
      className="createResourceModal"
      onSubmit={createResource}
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      key="createResourceModal"
    >
      <motion.p
        className="closeModal"
        onClick={closeModal}
        whileHover={{ scale: 1.1 }}
        key="errorCloserResource"
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
          required
        />
      </div>
      <div className="parallelContainer">
        <label htmlFor="startTime">Start Time</label>
        <select name="startTime" id="startTime" className="slots" required>
          {time.map((slot) => (
            <option value={slot} key={slot + "start"}>
              {slot}
            </option>
          ))}
        </select>
        <select name="start" id="start" className="slots">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="parallelContainer">
        <label htmlFor="endTime">End Time</label>
        <select name="endTime" id="endTime" className="slots" required>
          {time.map((slot) => (
            <option value={slot} key={slot + "start"}>
              {slot}
            </option>
          ))}
        </select>
        <select name="end" id="end" className="slots">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {pushingToDb ? (
        <img src={Loading} alt="pushing to db" className="loadingGIF" />
      ) : (
        <button className="create" type="submit">
          Create
        </button>
      )}
    </motion.form>
  );
}

export default CreateResourceModal;
