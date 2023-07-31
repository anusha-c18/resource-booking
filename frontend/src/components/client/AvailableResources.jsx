import React from "react";
import IndividualResource from "./IndividualResource";
import { useStateContext } from "../../lib/context";
import "./AvailableResources.css";

function AvailableResources() {
  const { uniqueAvailableResources } = useStateContext();
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
      <input
        type="date"
        name="date"
        id="date"
        className="date"
        min={minDate}
        max={maxDate}
      />
      <div className="allResources">
        {uniqueAvailableResources.map((resource, index) => (
          <IndividualResource
            key={index + " " + resource}
            resourceName={resource}
          ></IndividualResource>
        ))}
      </div>
    </>
  );
}

export default AvailableResources;
