import "./ResourceManagement.css";
import React from "react";
import { useStateContext } from "../../../lib/context";

function ResourceManagement() {
  return (
    <>
      <p className="title">Resource Management</p>
      <p className="title">Existing Resources</p>
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

export default ResourceManagement;
