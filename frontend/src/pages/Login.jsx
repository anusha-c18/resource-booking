import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();
  useEffect(() => {
    loginWithRedirect();
  }, []);
  return <div>login</div>;
}

export default Login;
