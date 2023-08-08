import React from "react";
import { useStateContext } from "../../../lib/context";
import { motion } from "framer-motion";
import "./MyBookings.css";

function MyBookings() {
  const { userBookings } = useStateContext();
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

  return (
    <>
      <p className="title">Bookings</p>
      <motion.div
        className="myBookings"
        initial={{ y: -10 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 9,
          duration: 0.6,
        }}
      >
        <table className="table">
          <thead className="bookingHeader">
            <tr>
              <th>Resource</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Booking Time</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody className="bookingBody">
            {userBookings.map((resource) => (
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
                <td>{resource.resource}</td>
                <td>{formatTime(resource.startTime)}</td>
                <td>{formatTime(resource.endTime)}</td>
                <td>{getTime(resource.bookingTimeStamp)}</td>
                <td>{getDate(resource.bookingTimeStamp)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
}

export default MyBookings;
