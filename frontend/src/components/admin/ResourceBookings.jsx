import React from "react";
import { useStateContext } from "../../lib/context";

function ResourceBookings() {
  const { allResources } = useStateContext();
  return (
    <table className="table">
      <tr>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Booked</th>
      </tr>
      {allResources.map((resource) => (
        <tr>
          <td>{resource.startTime}</td>
          <td>{resource.endTime}</td>
          <td>{resource.available}</td>
        </tr>
      ))}
      <tr></tr>
    </table>
  );
}

export default ResourceBookings;
