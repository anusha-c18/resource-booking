import React from "react";
import IndividualResource from "./IndividualResource";
import { useStateContext } from "../../../lib/context";
import "./AvailableResources.css";
import { motion } from "framer-motion";
import empty from "./../../../../public/images/empty.png";

function AvailableResources() {
  const {
    uniqueExistingResources,
    uniqueAvailableResources,
    fetchingUniqueAvailableResources,
  } = useStateContext();
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 2);
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const minDate = formatDate(today);
  const maxDate = formatDate(endDate);

  return (
    <>
      <p className="title">Available Resources</p>
      {/* <input
        type="date"
        name="date"
        id="date"
        className="date"
        min={minDate}
        max={maxDate}
      /> */}
      <div className="allResources">
        {fetchingUniqueAvailableResources ? (
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
            <p className="skeleton"></p>
          </motion.div>
        ) : (uniqueAvailableResources.length === 1 &&
            uniqueAvailableResources[0] === "All resources are booked.") ||
          (uniqueExistingResources.length === 1 &&
            uniqueExistingResources[0] === "No resources exist.") ? (
          <div className="empty">
            <p className="message">
              {uniqueExistingResources.length === 1 &&
              uniqueExistingResources[0] === "No resources exist."
                ? "No resources exist. Come back another time :)"
                : "All resources are booked! Come back another time :)"}
            </p>
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
              src={empty}
              alt=""
              className="emptyIcon"
            />
          </div>
        ) : (
          uniqueAvailableResources.map((resource, index) => (
            <IndividualResource
              key={index + " " + resource}
              resourceName={resource}
            ></IndividualResource>
          ))
        )}
      </div>
    </>
  );
}

export default AvailableResources;
