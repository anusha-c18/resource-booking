import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import login from "../../public/images/login.png";
import "./Login.css";
import { useUserContext } from "../lib/UserContext";

function Login() {
  const { loginWithRedirect, myUser, isLoading, logout } = useUserContext();

  const loginPage = () => {
    loginWithRedirect();
  };
  if (isLoading) {
    return null;
  } else {
    return (
      <div className="loginContainer">
        <p className="message">Welcome to Resource Booking App!</p>
        <p className="message">
          Login/Sign Up to proceed booking resources according to your needs :)
        </p>
        <motion.img
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          src={login}
          alt=""
          className="emptyIcon"
        />
        {console.log("my user", myUser)}
        {myUser ? (
          <button
            className="go"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        ) : (
          <button className="go" onClick={loginPage}>
            Go to Login
          </button>
        )}
      </div>
    );
  }
}

export default Login;
