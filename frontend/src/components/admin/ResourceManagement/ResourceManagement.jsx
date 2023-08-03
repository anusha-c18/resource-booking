import "./ResourceManagement.css";
import React from "react";
import { useStateContext } from "../../../lib/context";
import ExistingResource from "./ExistingResource";
import plus from "./../../../../public/images/plus.png";

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
        {uniqueExistingResources.map((resource, index) => (
          <ExistingResource
            key={index + " existing " + resource}
            resource={resource}
          ></ExistingResource>
        ))}
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
