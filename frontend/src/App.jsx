import { useEffect } from "react";
import "./App.css";
import { useStateContext } from "./lib/context";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import Error from "./pages/Error";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { domain, clientId, audience } from "./utils/config";
import { UserProvider } from "./lib/UserContext";
import { createBrowserRouter } from "react-router-dom";
import MyBookings from "./components/client/Bookings/MyBookings";
import AvailableResources from "./components/client/Resources/AvailableResources";
import RootLayout from "./pages/RootLayout";
import ResourceOverview from "./components/admin/Bookings/ResourceOverview";
import ResourceManagement from "./components/admin/ResourceManagement/ResourceManagement";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export function App() {
  const { getAccessTokenSilently } = useAuth0();

  const { updateAccessToken } = useStateContext();

  useEffect(() => {
    async function getToken() {
      const token = await getAccessTokenSilently();
      console.log("token from function", token);
      updateAccessToken(token);
    }
    getToken();
  }, []);

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
              element: withAuthenticationRequired(<AvailableResources />),
            },
            {
              path: "",
              index: true,
              element: withAuthenticationRequired(<AvailableResources />),
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
            {
              path: "resourceOverview",
              element: withAuthenticationRequired(<ResourceOverview />),
            },
            {
              path: "resourceManagement",
              element: withAuthenticationRequired(<ResourceManagement />),
            },
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
        audience={audience}
        scope={("read:admin", "read:client")}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Auth0Provider>
    </>

    //create route with element private route where check if myuser exists - then check the role of myuser - based on that render client and admin - nav bars + outlet tag to get the element to be rendered within
  );
}
