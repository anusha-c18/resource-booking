import React, { useState } from "react";
import "./ResourceAccordian.css";
import down from "../../../public/images/down.png";
import ResourceBookings from "./ResourceBookings";

function ResourceAccordian({ resourceName }) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordian = () => {
    setIsActive((state) => {
      return !state;
    });
  };

  return (
    <div className="accordian" onClick={toggleAccordian}>
      <div className="accordianHeader">
        {" "}
        <p>{resourceName}</p>
        <img className="arrow" src={down} alt="down arrow" />
      </div>
      {isActive ? <ResourceBookings /> : null}
    </div>
  );
}

export default ResourceAccordian;
