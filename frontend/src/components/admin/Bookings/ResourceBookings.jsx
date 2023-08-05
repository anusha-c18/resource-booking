import React from "react";
import "./ResourceBookings.css";
import { useStateContext } from "../../../lib/context";
import { motion } from "framer-motion";

function ResourceBookings({ resourceName }) {
  const { allBookings, fetchingAllBookings } = useStateContext();

  const getTime = (timestamp) => {
    const time = timestamp + "";
    return time.substring(time.indexOf("T") + 1, time.length - 1);
  };

  const getDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return day + "/" + month + "/" + year;
  };

  const formatTime = (time) => {
    let value = "";
    if (+time > 12) {
      value = +time - 12 + " PM";
    } else if (+time < 12) {
      value = time + " AM";
    } else {
      value = "12 PM";
    }
    return value;
  };

  return (
    <table className="table">
      <thead className="bookingHeader">
        <tr>
          <th>Flat</th>
          <th>Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Booking Time</th>
          <th>Booking Date</th>
        </tr>
      </thead>
      <tbody className="bookingBody">
        {fetchingAllBookings ? (
          <tr>
            <td className="skeletonRow"></td>
            <td className="skeletonRow"></td>
            <td className="skeletonRow"></td>
            <td className="skeletonRow"></td>
            <td className="skeletonRow"></td>
            <td className="skeletonRow"></td>
          </tr>
        ) : (
          allBookings.map((resource) =>
            resource.resource === resourceName ? (
              <motion.tr
                key={resource.resource + resource.bookingTimeStamp}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.2,
                  delay: 0.2,
                  ease: [0, 0.71, 0.5, 1.01],
                }}
              >
                <td>{resource.flat}</td>
                <td>{resource.name}</td>
                <td>{formatTime(resource.startTime)}</td>
                <td>{formatTime(resource.endTime)}</td>
                <td>{getTime(resource.bookingTimeStamp)}</td>
                <td>{getDate(resource.bookingTimeStamp)}</td>
              </motion.tr>
            ) : null
          )
        )}
      </tbody>
    </table>
  );
}

export default ResourceBookings;
