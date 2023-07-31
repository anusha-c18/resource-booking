import React from "react";
import "./IndividualResource.css";
import { useStateContext } from "../../lib/context";

function IndividualResource({ resourceName }) {
  const {
    currentResource,
    updateCurrentResource,
    updateBookingModalVisibility,
  } = useStateContext();
  const renderModal = () => {
    updateCurrentResource(resourceName);
    updateBookingModalVisibility();
  };
  return (
    <div className="individualResource" onClick={renderModal}>
      <p>{resourceName}</p>
    </div>
  );
}

export default IndividualResource;
