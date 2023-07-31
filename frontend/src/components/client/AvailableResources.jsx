import React from "react";
import IndividualResource from "./IndividualResource";
import { useStateContext } from "../../lib/context";
function AvailableResources() {
  const { uniqueAvailableResources } = useStateContext();
  return (
    <div className="allResources">
      {uniqueAvailableResources.map((resource, index) => (
        <IndividualResource
          key={index + " " + resource}
          resourceName={resource}
        ></IndividualResource>
      ))}
    </div>
  );
}

export default AvailableResources;
