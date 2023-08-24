import React, { useState, useEffect } from "react";
import "./EditModal.css";
import { motion } from "framer-motion";
import { useStateContext } from "../../lib/context";
import Loading from "../../../public/images/loading.gif";
import { notify } from "../../pages/RootLayout";

function EditModal() {
  const {
    uniqueExistingResources,
    toggleUpdatingResource,
    fetchResourceDetails,
    currentResource,
    updatingResource,
    updateResource,
    toggleEditResourceModal,
  } = useStateContext();

  const [startTime, setStartTime] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [details, setDetails] = useState({});
  const [resourceName, setResourceName] = useState(currentResource);

  let time = [];

  for (let i = 1; i < 13; i++) {
    time.push(i + "");
  }

  let start = "",
    end = "";

  useEffect(() => {
    const tempDetails = fetchResourceDetails(currentResource);
    setDetails(tempDetails);
    start = tempDetails.startTime;
    end = tempDetails.endTime;

    if (+start < 12) {
      setStartPeriod("AM");
    } else if (+start > 12) {
      start = +start - 12 + "";
      setStartPeriod("PM");
    } else {
      setStartPeriod("PM");
    }

    if (+end < 12) {
      setEndPeriod("AM");
    } else if (+end > 12) {
      end = +end - 12 + "";
      setEndPeriod("PM");
    } else {
      setEndPeriod("PM");
    }
    setStartTime(start);
    setEndTime(end);
  }, []);

  const closeModal = () => {
    toggleEditResourceModal();
  };

  const createResource = (event) => {
    event.preventDefault();
    if (
      resourceName.trim() != currentResource &&
      uniqueExistingResources.includes(resourceName.trim())
    ) {
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
      resource.resource = resourceName;
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
      if (
        currentResource == resourceName.trim() &&
        details.startTime == resource.startTime &&
        details.endTime == resource.endTime
      ) {
        notify("No Changes Detected: The resource details remain unchanged.");
        closeModal();
      } else {
        toggleUpdatingResource(true);
        let newDetails = { resource: resourceName };
        if (startPeriod == "PM" && startTime != "12") {
          newDetails.startTime = +startTime + 12 + "";
        } else if (startPeriod == "AM") {
          newDetails.startTime = startTime;
        }
        if (endPeriod == "PM" && endTime != "12") {
          newDetails.endTime = +endTime + 12 + "";
        } else if (endPeriod == "AM") {
          newDetails.endTime = endTime;
        }
        updateResource(newDetails);
      }
    }
  };

  const updateStartValue = (event) => {
    setStartTime(event.target.value);
  };

  const updateEndValue = (event) => {
    setEndTime(event.target.value);
  };

  const updateEndPeriod = (event) => {
    setEndTime(event.target.value);
  };

  const updateStartPeriod = (event) => {
    setEndTime(event.target.value);
  };

  const updateResourceName = (event) => {
    setResourceName(event.target.value);
  };

  return (
    <motion.form
      className="editResourceModal"
      onSubmit={createResource}
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      key="editResourceModal"
    >
      <motion.p
        className="closeModal"
        onClick={closeModal}
        whileHover={{ scale: 1.1 }}
        key="editorCloserResource"
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
          value={resourceName}
          onChange={updateResourceName}
        />
      </div>
      <div className="parallelContainer">
        <label htmlFor="startTime">Start Time</label>
        <select
          name="startTime"
          id="startTime"
          className="slots"
          required
          value={startTime}
          onChange={updateStartValue}
        >
          {time.map((slot) => (
            <option value={slot} key={slot + "start"}>
              {slot}
            </option>
          ))}
        </select>
        <select
          name="start"
          id="start"
          className="slots"
          value={startPeriod}
          onChange={updateStartPeriod}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="parallelContainer">
        <label htmlFor="endTime">End Time</label>
        <select
          name="endTime"
          id="endTime"
          className="slots"
          required
          value={endTime}
          onChange={updateEndValue}
        >
          {time.map((slot) => (
            <option value={slot} key={slot + "start"}>
              {slot}
            </option>
          ))}
        </select>
        <select
          name="end"
          id="end"
          className="slots"
          value={endPeriod}
          onChange={updateEndPeriod}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {updatingResource ? (
        <img src={Loading} alt="pushing to db" className="loadingGIF" />
      ) : (
        <button className="create" type="submit">
          Update
        </button>
      )}
    </motion.form>
  );
}

export default EditModal;
