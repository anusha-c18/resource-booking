import React, { createContext, useEffect, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [allResources, setAllResources] = useState([]);
  const [uniqueAvailableResources, setUniqueAvailableResources] = useState([]);
  const [bookingModalVisibility, setBookingModalVisibility] = useState(false);
  const [currentResource, setCurrentResource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", flat: "" });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [uniqueResourcesbooked, setUniqueResourcesbooked] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const resources = fetch(
      "http://localhost:8000/api/routes/records-rt/allResources",
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
      "http://localhost:8000/api/routes/records-rt/allBookings",
      { mode: "cors" },
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        setAllBookings(data);
      });
  }, []);

  useEffect(() => {
    const resources = fetch(
      "http://localhost:8000/api/routes/records-rt/uniqueResourcesBooked",
      { mode: "cors" },
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        setUniqueResourcesbooked(data);
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

  useEffect(() => {
    console.log(allBookings);
  }, [allBookings]);

  const updateCurrentResource = (resourceName) => {
    setCurrentResource(resourceName);
  };

  const updateStartTime = (time) => {
    setStartTime(time);
  };

  const resetValues = () => {
    setCurrentResource("");
    setStartTime("");
    setAvailableTimeSlots([]);
  };

  const updateUserDetails = () => {
    ////setup endpoint connection here using useEffect based on login details
  };

  const pushBooking = (slot) => {
    //post data to insertBooking route
    let document = {};
    document.resource = currentResource;
    // const userDetails = await;
    //create endpoint to fetch 2 details below
    // document.flat = booking.flat; -get from users collection
    // document.name = booking.name; -get from users collection
    const slotBreakup = slot.split(" ");
    if (
      slotBreakup[1] == "AM" ||
      (slotBreakup[0] == "12" && slotBreakup[1] == "PM")
    ) {
      document.startTime = slotBreakup[0];
    } else {
      document.startTime = parseInt(slotBreakup[0]) + 12 + "";
    }
    document.endTime = parseInt(document.startTime) + 1 + "";
    document.bookingTimeStamp = new Date().toISOString();
    console.log(document);
  };

  const updateBookingModalVisibility = () => {
    setBookingModalVisibility((state) => {
      return !state;
    });
  };

  const updateAvailableTimeSlots = (resource) => {
    let resourceTimings = [];
    for (let i = 0; i < availableResources.length; i++) {
      let begin = "",
        end = "";
      if (availableResources[i].resource === resource) {
        if (parseInt(availableResources[i].startTime) > 12) {
          begin = parseInt(availableResources[i].startTime) - 12 + " PM";
        } else if (parseInt(availableResources[i].startTime) < 12) {
          begin = availableResources[i].startTime + " AM";
        } else {
          begin = "12 PM";
        }
        if (parseInt(availableResources[i].endTime) > 12) {
          end = parseInt(availableResources[i].endTime) - 12 + " PM";
        } else if (parseInt(availableResources[i].endTime) < 12) {
          end = availableResources[i].endTime + " AM";
        } else {
          end = "12 PM";
        }
        resourceTimings.push([begin, end]);
      }
    }
    setAvailableTimeSlots(resourceTimings);
    console.log(resourceTimings);
  };

  return (
    <Context.Provider
      value={{
        allResources,
        allBookings,
        uniqueResourcesbooked,
        uniqueAvailableResources,
        bookingModalVisibility,
        currentResource,
        startTime,
        availableTimeSlots,
        updateAvailableTimeSlots,
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
