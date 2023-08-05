import React, { useState } from "react";
import "./ResourceAccordian.css";
import down from "../../../../public/images/down.png";
import ResourceBookings from "./ResourceBookings";
import { motion } from "framer-motion";

function ResourceAccordian({ resourceName }) {
  const [isActive, setIsActive] = useState(false);
  const toggleAccordian = () => {
    setIsActive((state) => {
      return !state;
    });
  };

  return (
    <motion.div
      className="accordian"
      initial={{ y: -10 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 9,
        duration: 0.6,
      }}
      onClick={toggleAccordian}
    >
      <div className="accordianHeader">
        {" "}
        <p>{resourceName}</p>
        <img
          className="arrow"
          src={down}
          alt="down arrow"
          style={{ transform: isActive ? "rotateZ(90deg)" : "rotateZ(0deg)" }}
        />
      </div>
      {isActive ? <ResourceBookings resourceName={resourceName} /> : null}
    </motion.div>
  );
}

export default ResourceAccordian;
