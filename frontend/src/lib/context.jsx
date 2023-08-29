import React, { createContext, useEffect, useContext, useState } from "react";
import { notify } from "./../pages/RootLayout";
import { domain, clientId } from "./../utils/config";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export const StateContext = ({ children }) => {
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
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken != null) {
      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
      }
      const data = parseJwt(accessToken);
      const permissions = data.permissions[0];
      const parts = permissions.split(":");
      const userRole = parts[1];
      console.log("role: ", userRole);
      setRole(userRole);
      if (userRole == "admin") {
        navigate("/admin");
      } else if (userRole == "client") {
        navigate("/client");
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken != null) {
      try {
        console.log("going to extract user data - new");
        const result = fetch(
          "https://dev-1k4isffw1z8aw3io.us.auth0.com/userinfo",
          {
            method: "GET",
            headers: { authorization: "Bearer " + accessToken },
            scope: "read:admin read:client",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("extracted user data - new", data);
            console.log("extracted user data - new", data.permissions);
            console.log("extracted user data - new", data.payload);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [accessToken, user]);

  useEffect(() => {
    async function getToken() {
      console.log("hi");
      return getAccessTokenSilently();
    }
    getToken()
      .then((token) => {
        console.log("token from function", token);

        updateAccessToken(token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  useEffect(() => {
    if (accessToken != null) {
      console.log("going to fetch");
      setFetchingResources(true);
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueExistingResources",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
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
    }
  }, [fetchAllResource, accessToken]);

  useEffect(() => {
    if (accessToken != null) {
      console.log("accessTokenyoMama", accessToken);
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/allResources",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setAllResources(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [fetchAllResource, accessToken]);

  useEffect(() => {
    if (accessToken != null) {
      setFetchingAllBookings(true);
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/allBookings",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("all bookings", data);
            setAllBookings(data);
          });
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setFetchingAllBookings(false);
      }, 1000);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken != null) {
      setFetchingUniqueBookings(true);
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueResourcesBooked",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
          }
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
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken != null) {
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/uniqueAvailableResources",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setUniqueAvailableResources(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [fetchAllResource, accessToken]);

  useEffect(() => {
    console.log(availableTimeSlots);
  }, [availableTimeSlots]);

  const toggleEditResourceModal = () => {
    setEditResourceModal((state) => {
      return !state;
    });
  };

  const updateAccessToken = (value) => {
    setAccessToken(value);
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
          mode: "cors",
          method: "POST",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resource),
          data: { flags: { use_scope_descriptions_for_consent: true } },
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
    if (accessToken != null) {
      try {
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/getUserBookings/" +
            "briha",
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            data: { flags: { use_scope_descriptions_for_consent: true } },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setUserBookings(data);
            console.log(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [accessToken]);

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
      const resources = fetch(endpoint, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: { flags: { use_scope_descriptions_for_consent: true } },
      })
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
                mode: "cors",
                method: "POST",
                headers: {
                  authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(resource),
                data: { flags: { use_scope_descriptions_for_consent: true } },
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
    const resources = fetch(endpoint, {
      mode: "cors",
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: { flags: { use_scope_descriptions_for_consent: true } },
    })
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
    const resources2 = fetch(endpoint, {
      mode: "cors",
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: { flags: { use_scope_descriptions_for_consent: true } },
    })
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
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
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
          role,
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
          updateAccessToken,
        }}
      >
        {children}
      </Context.Provider>
    </Auth0Provider>
  );
};
export const useStateContext = () => useContext(Context);
