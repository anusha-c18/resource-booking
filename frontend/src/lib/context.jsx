import React, { createContext, useEffect, useContext, useState } from "react";
import { notify } from "./../pages/RootLayout";
import { domain, clientId } from "./../utils/config";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [allResources, setAllResources] = useState([]);
  const [navIsActive, setNavIsActive] = useState(false);
  const [uniqueAvailableResources, setUniqueAvailableResources] = useState([]);
  const [bookingModalVisibility, setBookingModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [currentResource, setCurrentResource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [userFlat, setUserFlat] = useState("");
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
  const [userName, setUserName] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const [newUserVisibility, setNewUserVisibility] = useState(false);

  useEffect(() => {
    if (accessToken != null && user != null) {
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
      let userRole;
      const data = parseJwt(accessToken);
      if (data.permissions.length == 0) {
        setRole("client");
        userRole = "client";
      } else {
        const permissions = data.permissions[0];
        const parts = permissions.split(":");
        userRole = parts[1];
        console.log("role: ", userRole);
        setRole(userRole);
      }
      if (userRole == "admin") {
        navigate("/admin");
      } else if (userRole == "client") {
        navigate("/client");
      }
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (accessToken != null) {
      try {
        const result = fetch(
          "https://dev-1k4isffw1z8aw3io.us.auth0.com/userinfo",
          {
            method: "GET",
            headers: { authorization: "Bearer " + accessToken },
            scope: "read:admin read:client",
          }
        )
          .then((response) => response.json())
          .then((data) => {});
      } catch (err) {
        console.log(err);
      }
    }
  }, [accessToken, user]);

  useEffect(() => {
    async function getToken() {
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
    if (accessToken != null && user != null) {
      try {
        const name = user.given_name != "" ? user.given_name : user.nickname;
        setUserName(name);
        console.log("name of the user: ", name);
        const resources = fetch(
          "https://resource-booking-api.vercel.app/api/routes/records-rt/checkUser/" +
            name,
          {
            mode: "cors",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
          //has to return true or false
          .then((response) => response.json())
          .then((data) => {
            console.log("user exists: ", data);
            if (!data[0]) {
              toggleNewUserModal();
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (accessToken != null) {
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

  const createNewUser = async (flat) => {
    setPushingToDb(true);
    try {
      console.log("creating user");
      const link =
        "https://resource-booking-api.vercel.app/api/routes/records-rt/createUser/" +
        userName +
        "/" +
        flat;
      setUserFlat(flat);
      const result = fetch(link, {
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
          notify("Could not enter details. Please try again!");
        });
    } catch (err) {
      console.log(err);
    }
    setPushingToDb(false);
    toggleNewUserModal();
  };

  const toggleNewUserModal = () => {
    setNewUserVisibility((state) => {
      return !state;
    });
  };

  const toggleEditResourceModal = () => {
    setEditResourceModal((state) => {
      return !state;
    });
  };

  const toggleNavIsActive = () => {
    setNavIsActive((state) => {
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

  const updateDeleteModalVisibility = () => {
    setDeleteModalVisibility((state) => {
      return !state;
    });
  };

  const pushBooking = (slot) => {
    let document = {};
    document.resource = currentResource;
    document.flat = userFlat;
    document.name = userName;
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
    console.log("booking doc to be inserted", document);
    setPushingToDb(true);
    try {
      const result = fetch(
        "https://resource-booking-api.vercel.app/api/routes/records-rt/insertBooking",
        {
          mode: "cors",
          method: "POST",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(document),
          data: { flags: { use_scope_descriptions_for_consent: true } },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          notify(result);
        })
        .catch((error) => {
          notify("Could not book resource. Please try again!");
        });
    } catch (err) {
      console.log(err);
      notify("Could not book resource. Please try again!");
    }
    setPushingToDb(false);
    updateBookingModalVisibility();
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
          navIsActive,
          newUserVisibility,
          toggleNewUserModal,
          updateResource,
          createNewUser,
          toggleNavIsActive,
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
