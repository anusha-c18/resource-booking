import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { StateContext } from "./lib/context";
import { Auth0Provider } from "@auth0/auth0-react";
import { domain, clientId, audience } from "./utils/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "https://resource-booking-frontend.vercel.app/client",
      }}
      cacheLocation="localstorage"
      audience={audience}
      scope="read:admin"
    >
      <StateContext>
        <App />
      </StateContext>
    </Auth0Provider>
  </React.StrictMode>
);
