import { useState } from "react";
import "./App.css";
import AvailableResources from "./components/client/AvailableResources";
import BookingModal from "./components/modals/bookingModal";
import { useStateContext } from "./lib/context";
import { AnimatePresence } from "framer-motion";

function App() {
  const { bookingModalVisibility } = useStateContext();
  return (
    <>
      <AnimatePresence>
        {bookingModalVisibility ? <BookingModal /> : null}
      </AnimatePresence>
      <AvailableResources></AvailableResources>
    </>
  );
}

export default App;
