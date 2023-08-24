import React, { createContext, useEffect, useContext, useState } from "react";
import { notify } from "./../pages/RootLayout";

const Context = createContext();

export const StateContext = ({ children }) => {
  const accessToken = async function () {
    return await getCredentials().accessToken;
  };
  const [allResources, setAllResources] = useState([]);
  const [uniqueAvailableResources, setUniqueAvailableResources] = useState([]);
  const [bookingModalVisibility, setBookingModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [currentResource, setCurrentResource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", flat: "" });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [uniqueResourcesbooked, setUniqueResourcesbooked] = useState([]);
  const [uniqueExistingResources, setUniqueExistingResources] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [createResourceModalVisibility, setCreateResourceModalVisibility] =
    useState(false);
  const [fetchAllResource, setFetchAllResources] = useState(false);
  const [pushingToDb, setPushingToDb] = useState(false);
  const [fetchingResources, setFetchingResources] = useState(false);
  const [fetchingAllBookings, setFetchingAllBookings] = useState(false);
  const [fetchingUniqueBookings, setFetchingUniqueBookings] = useState(false);
  const [deletingResource, setDeletingResource] = useState(false);
  const [editResourceModal, setEditResourceModal] = useState(false);
  const [updatingResource, setUpdatingResource] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    setFetchingResources(true);
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueExistingResources",
        { mode: "cors" },
        { method: "GET" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUniqueExistingResources(data);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setFetchingResources(false);
    }, 500);
  }, [fetchAllResource]);

  useEffect(() => {
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/allResources",
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAllResources(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [fetchAllResource]);

  useEffect(() => {
    setFetchingAllBookings(true);
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/allBookings",
        { mode: "cors" },
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setAllBookings(data);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setFetchingAllBookings(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setFetchingUniqueBookings(true);
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueResourcesBooked",
        { mode: "cors" },
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setUniqueResourcesbooked(data);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setFetchingUniqueBookings(false);
    }, 500);
  }, []);

  useEffect(() => {
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueAvailableResources",
        { mode: "cors" },
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setUniqueAvailableResources(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [fetchAllResource]);

  useEffect(() => {
    console.log(availableTimeSlots);
  }, [availableTimeSlots]);

  const toggleEditResourceModal = () => {
    setEditResourceModal((state) => {
      return !state;
    });
  };

  const fetchResourceDetails = (name) => {
    let startTime = "",
      endTime = "";
    let details = {};
    for (let i = 0; i < allResources.length; i++) {
      if (allResources[i].resource == name) {
        if (startTime == "") {
          startTime = allResources[i].startTime;
          endTime = allResources[0].endTime;
        }
        if (+allResources[i].startTime < +startTime) {
          startTime = allResources[0].startTime;
        } else if (+allResources[i].endTime > +endTime) {
          endTime = allResources[i].endTime;
        }
      }
    }
    details = { startTime, endTime };
    return details;
  };

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

  const updateDeleteModalVisibility = () => {
    setDeleteModalVisibility((state) => {
      return !state;
    });
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

  const updateCreateResourceVisibility = () => {
    setCreateResourceModalVisibility((state) => {
      return !state;
    });
  };

  const updateBookingModalVisibility = () => {
    setBookingModalVisibility((state) => {
      return !state;
    });
  };

  const updateAvailableTimeSlots = (resource) => {
    let resourceTimings = [];
    for (let i = 0; i < allResources.length; i++) {
      let begin = "",
        end = "";
      if (allResources[i].resource === resource) {
        if (+allResources[i].startTime > 12) {
          begin = +allResources[i].startTime - 12 + " PM";
        } else if (+allResources[i].startTime < 12) {
          begin = +allResources[i].startTime + " AM";
        } else {
          begin = "12 PM";
        }
        if (allResources[i].endTime > 12) {
          end = +allResources[i].endTime - 12 + " PM";
        } else if (+allResources[i].endTime < 12) {
          end = +allResources[i].endTime + " AM";
        } else {
          end = "12 PM";
        }
        resourceTimings.push([begin, end]);
      }
    }
    setAvailableTimeSlots(resourceTimings);
  };

  const createNewResource = async (resource) => {
    console.log("cretion", resource);
    const date = new Date();
    const day = date.getDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    resource.date = month + "/" + day + "/" + year;
    setPushingToDb(true);
    try {
      await fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/createNewResource",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resource),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          notify(result);
        })
        .catch((error) => {
          notify("Resource creation failed. Please try again!");
        });
    } catch (err) {
      console.log(err);
    }
    updateFetchResources();
    setPushingToDb(false);
    setCreateResourceModalVisibility(false);
  };

  useEffect(() => {
    console.log("all", allResources);
  }, [allResources]);

  useEffect(() => {
    try {
      const resources = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/getUserBookings/" +
          "briha",
        { mode: "cors" },
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserBookings(data);
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateFetchResources = () => {
    setFetchAllResources((state) => {
      return !state;
    });
  };

  const updateResource = async (resource) => {
    setUpdatingResource(true);
    let endpoint =
      "https://resource-booking-api.vercel.app/api/routes/records-rt/deleteResource/" +
      currentResource;
    try {
      const resources = fetch(endpoint, { mode: "cors" }, { method: "GET" })
        .then((response) => response.json())
        .then(async (result) => {
          console.log(result);
          const date = new Date();
          const day = date.getDate();
          const month = date.getUTCMonth() + 1;
          const year = date.getUTCFullYear();
          resource.date = month + "/" + day + "/" + year;
          try {
            await fetch(
              "https://resource-booking-api.vercel.app/api/routes/records-rt/createNewResource",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(resource),
              }
            )
              .then((response) => response.json())
              .then((result) => {
                notify("Resource successfully updated!");
              })
              .catch((error) => {
                notify("Resource updation failed. Please try again!");
              });
          } catch (err) {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      toggleUpdatingResource(false);
      toggleEditResourceModal();
      updateFetchResources();
    }, 500);
  };

  const resourceDeletion = (resource) => {
    setDeletingResource(true);
    let endpoint =
      "https://resource-booking-api.vercel.app/api/routes/records-rt/deleteResource/" +
      resource;
    const resources = fetch(endpoint, { mode: "cors" }, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        notify(result);
      })
      .catch((error) => {
        notify("Resource deletion failed. Please try again!");
      });
    setTimeout(() => {
      updateFetchResources();
      updateDeleteModalVisibility();
      setDeletingResource(false);
    }, 1000);
    endpoint =
      "https://resource-booking-api.vercel.app/api/routes/records-rt/deleteBookings/" +
      resource;
    const resources2 = fetch(endpoint, { mode: "cors" }, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        notify(result);
      })
      .catch((error) => {
        notify("Resource's bookings deletion failed. Please try again!");
      });
    //delete those resource's bookings also
  };

  const toggleUpdatingResource = (value) => {
    setUpdatingResource(value);
  };

  return (
    <Context.Provider
      value={{
        allResources,
        allBookings,
        userBookings,
        uniqueExistingResources,
        uniqueResourcesbooked,
        fetchingUniqueBookings,
        uniqueAvailableResources,
        bookingModalVisibility,
        currentResource,
        startTime,
        availableTimeSlots,
        pushingToDb,
        updatingResource,
        createResourceModalVisibility,
        fetchingResources,
        deleteModalVisibility,
        fetchingAllBookings,
        deletingResource,
        editResourceModal,
        updateResource,
        toggleUpdatingResource,
        toggleEditResourceModal,
        resourceDeletion,
        updateDeleteModalVisibility,
        updateAvailableTimeSlots,
        createNewResource,
        pushBooking,
        updateStartTime,
        updateCurrentResource,
        updateCreateResourceVisibility,
        updateBookingModalVisibility,
        fetchResourceDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
