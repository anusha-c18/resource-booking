import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    console.log("user", user);
    console.log("is authenticated", isAuthenticated);
    console.log("is loading", isLoading);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        loginWithRedirect,
        logout,
      }}
    >
      {" "}
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
