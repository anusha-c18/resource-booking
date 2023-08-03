import React from "react";
import "./ExistingResource.css";

function ExistingResource({ resource }) {
  return (
    <div className="resource">
      {resource}
      <div className="parallel">
        <button className="edit button">Edit</button>
        <button className="delete button">Delete</button>
      </div>
    </div>
  );
}

export default ExistingResource;
