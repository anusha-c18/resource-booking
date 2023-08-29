import { useEffect, useState } from "react";
import "./App.css";
import { useStateContext } from "./lib/context";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./lib/UserContext";
import { createBrowserRouter } from "react-router-dom";
import MyBookings from "./components/client/Bookings/MyBookings";
import AvailableResources from "./components/client/Resources/AvailableResources";
import RootLayout from "./pages/RootLayout";
import ResourceOverview from "./components/admin/Bookings/ResourceOverview";
import ResourceManagement from "./components/admin/ResourceManagement/ResourceManagement";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Login />} />
            <Route path="client" element={<Client />}>
              <Route index element={<AvailableResources />} />
              <Route path="myBookings" element={<MyBookings />} />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route index element={<ResourceOverview />} />
              <Route path="resourceOverview" element={<ResourceOverview />} />
              <Route
                path="resourceManagement"
                element={<ResourceManagement />}
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </UserProvider>
    </>

    //create route with element private route where check if myuser exists - then check the role of myuser - based on that render client and admin - nav bars + outlet tag to get the element to be rendered within
  );
}
