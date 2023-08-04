import "./ResourceManagement.css";
import React from "react";
import { useStateContext } from "../../../lib/context";
import ExistingResource from "./ExistingResource";
import plus from "./../../../../public/images/plus.png";
import empty from "./../../../../public/images/empty.png";
function ResourceManagement() {
  const { uniqueExistingResources, updateCreateResourceVisibility } =
    useStateContext();

  const toggleCreateResourceModal = () => {
    updateCreateResourceVisibility();
  };

  return (
    <>
      <p className="title">Resource Management</p>
      <p className="title">Existing Resources</p>
      <div className="allResources">
        {uniqueExistingResources.length === 1 &&
        uniqueExistingResources[0] === "No resources exist." ? (
          <div className="empty">
            <p className="message">
              {"No resources exist! Create a resource below " + ":)"}
            </p>
            <img src={empty} alt="" className="emptyIcon" />
            {console.log("emptyyy", uniqueExistingResources.length)}
          </div>
        ) : (
          uniqueExistingResources.map((resource, index) => (
            <ExistingResource
              key={index + " existing " + resource}
              resource={resource}
            ></ExistingResource>
          ))
        )}
      </div>
      <div className="createResource">
        <p className="title">Add a Resource</p>
        <div className="add" onClick={toggleCreateResourceModal}>
          <img src={plus} alt="add a resource" className="addIcon" />
        </div>
      </div>
    </>
  );
}

export default ResourceManagement;
