import React from "react";
import "./ResourceOverview.css";
import { useStateContext } from "../../../lib/context";
import ResourceAccordian from "./ResourceAccordian";
import { motion } from "framer-motion";

function ResourceOverview() {
  const { fetchingUniqueBookings, uniqueResourcesbooked } = useStateContext();
  return (
    <>
      <p className="title">Bookings</p>
      <div className="allResources">
        {fetchingUniqueBookings ? (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 9,
              duration: 0.6,
            }}
            className="skeletonBooking"
          >
            <p className="skeletonTitle">{}</p>
            <p className="skeletonImage">{}</p>
          </motion.div>
        ) : (
          uniqueResourcesbooked.map((resource, index) => (
            <ResourceAccordian
              key={index + " admin " + resource}
              resourceName={resource}
            ></ResourceAccordian>
          ))
        )}
      </div>
    </>
  );
}

export default ResourceOverview;
