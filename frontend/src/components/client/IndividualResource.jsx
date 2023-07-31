import React from "react";
import "./IndividualResource.css";
import { useStateContext } from "../../lib/context";

function IndividualResource({ resourceName }) {
  return (
    <div className="individualResource">
      <p>{resourceName}</p>
    </div>
  );
}

export default IndividualResource;
