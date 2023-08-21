import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { StateContext } from "./lib/context";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1k4isffw1z8aw3io.us.auth0.com"
      clientID="YDATtJWpOnS9ldhuJoIM7FF1d24RXWXf"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <StateContext>
        <App />
      </StateContext>
    </Auth0Provider>
  </React.StrictMode>
);
