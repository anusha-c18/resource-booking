import "./App.css";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./lib/UserContext";
import MyBookings from "./components/client/Bookings/MyBookings";
import AvailableResources from "./components/client/Resources/AvailableResources";
import RootLayout from "./pages/RootLayout";
import ResourceOverview from "./components/admin/Bookings/ResourceOverview";
import ResourceManagement from "./components/admin/ResourceManagement/ResourceManagement";

export function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Login />} />
            <Route path="client" element={<Client />}>
              <Route index element={<AvailableResources />} />
              <Route
                path="availableResources"
                element={<AvailableResources />}
              />
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
  );
}
