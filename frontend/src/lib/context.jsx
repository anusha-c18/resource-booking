import React, { createContext, useEffect, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [availableResources, setAllResources] = useState([]);
  const [uniqueAvailableResources, setUniqueAvailableResources] = useState([]);
  const [bookingModalVisibility, setBookingModalVisibility] = useState(false);
  const [currentResource, setCurrentResource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", flat: "" });

  useEffect(() => {
    const resources = fetch(
      "http://localhost:8000/api/routes/records-rt/availableResources",
      { mode: "cors" },
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        setAllResources(data);
      });
  }, []);

  useEffect(() => {
    const resources = fetch(
      "http://localhost:8000/api/routes/records-rt/uniqueAvailableResources",
      { mode: "cors" },
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        setUniqueAvailableResources(data);
      });
  }, []);

  const updateCurrentResource = (resourceName) => {
    setCurrentResource(resourceName);
  };

  const updateStartTime = (time) => {
    setStartTime(time);
  };

  const resetValues = () => {
    setCurrentResource("");
    setStartTime("");
  };

  const updateUserDetails = () => {};

  const pushBooking = () => {
    //post data to insertBooking route
    let document = {};
    document.resource = currentResource;
    // const userDetails = await;
    //create endpoint to fetch 2 details below
    // document.flat = booking.flat; -get from users collection
    // document.name = booking.name; -get from users collection
    document.startTime = startTime;
    document.endTime = Integer.parseInt(startTime) + 1 + "";
    document.bookingTimeStamp = new Date().toISOString();
  };

  const updateBookingModalVisibility = () => {
    setBookingModalVisibility((state) => {
      return !state;
    });
  };

  return (
    <Context.Provider
      value={{
        availableResources,
        uniqueAvailableResources,
        bookingModalVisibility,
        currentResource,
        startTime,
        pushBooking,
        updateStartTime,
        updateCurrentResource,
        updateBookingModalVisibility,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
