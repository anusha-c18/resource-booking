import "./ResourceManagement.css";
import React from "react";
import { useStateContext } from "../../../lib/context";
import ExistingResource from "./ExistingResource";
import plus from "./../../../../public/images/plus.png";
import empty from "./../../../../public/images/empty.png";
import { motion } from "framer-motion";

function ResourceManagement() {
  const {
    fetchingResources,
    uniqueExistingResources,
    updateCreateResourceVisibility,
  } = useStateContext();

  const toggleCreateResourceModal = () => {
    updateCreateResourceVisibility();
  };

  return (
    <>
      <p className="title">Resource Management</p>
      <p className="title">Existing Resources</p>
      <div className="allResources">
        {fetchingResources ? (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 9,
              duration: 0.6,
            }}
            className="resource"
          >
            <p className="skeleton"></p>
            <div className="parallel">
              <button className="skeleton "></button>
              <button className="skeleton "></button>
            </div>
          </motion.div>
        ) : uniqueExistingResources.length === 1 &&
          uniqueExistingResources[0] === "No resources exist." ? (
          <div className="empty">
            <p className="message">
              {"No resources exist! Create a resource below " + ":)"}
            </p>
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
              src={empty}
              alt=""
              className="emptyIcon"
            />
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
