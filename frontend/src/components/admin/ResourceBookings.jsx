import React from "react";
import "./ResourceBookings.css";
import { useStateContext } from "../../lib/context";

function ResourceBookings({ resourceName }) {
  const { allBookings } = useStateContext();

  const getTime = (timestamp) => {
    const time = timestamp + "";
    return time.substring(time.indexOf("T") + 1, time.length - 1);
  };

  const getDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    return day + "/" + month;
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
        {allBookings.map((resource) =>
          resource.resource === resourceName ? (
            <tr key={resource.resource + resource.bookingTimeStamp}>
              <td>{resource.flat}</td>
              <td>{resource.name}</td>
              <td>{resource.startTime}</td>
              <td>{resource.endTime}</td>
              <td>{getTime(resource.bookingTimeStamp)}</td>
              <td>{getDate(resource.bookingTimeStamp)}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
}

export default ResourceBookings;
