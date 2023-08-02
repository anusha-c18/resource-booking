import React from "react";
import "./ResourceOverview.css";

function ResourceOverview() {
  return (
    <>
      <p className="title">Resource Overview</p>
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

export default ResourceOverview;
