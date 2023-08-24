import { useState } from "react";
import "./App.css";
import BookingModal from "./components/modals/BookingModal";
import { useStateContext } from "./lib/context";
import { AnimatePresence } from "framer-motion";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import CreateResourceModal from "./components/modals/CreateResourceModal";
import { Auth0Provider } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";
import DeleteModal from "../src/components/modals/DeleteModal";
import EditModal from "./components/modals/EditModal";
import Error from "./pages/Error";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { domain, clientId } from "./utils/config";
import { UserProvider } from "./lib/UserContext";
import { createBrowserRouter } from "react-router-dom";
import MyBookings from "./components/client/Bookings/MyBookings";
import AvailableResources from "./components/client/Resources/AvailableResources";
import RootLayout from "./pages/RootLayout";
import ResourceOverview from "./components/admin/Bookings/ResourceOverview";
import ResourceManagement from "./components/admin/ResourceManagement/ResourceManagement";

export function App() {
  const {
    editResourceModal,
    deleteModalVisibility,
    bookingModalVisibility,
    createResourceModalVisibility,
  } = useStateContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Login /> },
        {
          path: "client",
          element: <Client />,
          children: [
            {
              path: "availableResources",
              index: true,
              element: <AvailableResources />,
            },
            {
              path: "",
              index: true,
              element: <AvailableResources />,
            },
            { path: "myBookings", element: <MyBookings /> },
          ],
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              path: "",
              index: true,
              element: <ResourceOverview />,
            },
            { path: "resourceOverview", element: <ResourceOverview /> },
            { path: "resourceManagement", element: <ResourceManagement /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
      >
        <UserProvider>
          <RouterProvider router={router}>
            {/* <Route index element={<Login />} /> */}
            {/*  */}
          </RouterProvider>
        </UserProvider>
      </Auth0Provider>
    </>

    //create route with element private route where check if myuser exists - then check the role of myuser - based on that render client and admin - nav bars + outlet tag to get the element to be rendered within
  );
}
