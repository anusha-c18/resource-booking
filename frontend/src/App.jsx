import { useState } from "react";
import "./App.css";
import AvailableResources from "./components/client/AvailableResources";
import BookingModal from "./components/modals/bookingModal";
import { useStateContext } from "./lib/context";

function App() {
  const { bookingModalVisibility } = useStateContext();
  return (
    <>
      {bookingModalVisibility ? <BookingModal /> : null}
      <AvailableResources></AvailableResources>
    </>
  );
}

export default App;
