import React from "react";
import "./ResourceOverview.css";
import { useStateContext } from "../../lib/context";
import ResourceAccordian from "./ResourceAccordian";

function ResourceOverview() {
  const { uniqueResourcesbooked } = useStateContext();
  return (
    <>
      <p className="title">Resource Overview</p>
      <div className="allResources">
        {uniqueResourcesbooked.map((resource, index) => (
          <ResourceAccordian
            key={index + " admin " + resource}
            resourceName={resource}
          ></ResourceAccordian>
        ))}
      </div>
    </>
  );
}

export default ResourceOverview;
