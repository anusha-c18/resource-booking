import React, { createContext, useEffect, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [availableResources, setAllResources] = useState([]);
  const [uniqueAvailableResources, setUniqueAvailableResources] = useState([]);
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

  return (
    <Context.Provider value={{ availableResources, uniqueAvailableResources }}>
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
