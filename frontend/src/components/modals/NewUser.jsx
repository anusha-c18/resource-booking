import React from "react";
import { useStateContext } from "../../lib/context";
import Loading from "./../../../public/images/loading.gif";
import { motion } from "framer-motion";
import "./NewUser.css";

function NewUser() {
  const createNewUser = (event) => {
    event.preventDefault();
    console.log("flat number", event.target[0].value);
    createNewUser(event.target[0].value);
  };

  const { pushingToDb } = useStateContext();
  return (
    <motion.form
      className="newUserModal"
      onSubmit={createNewUser}
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      key="newUserModal"
    >
      <div className="parallelContainer">
        <label htmlFor="flatNumber">Flat Number</label>
        <input
          type="text"
          name="flatNumber"
          id="flatNumber"
          className="resourceName"
          required
        />
      </div>
      {pushingToDb ? (
        <img src={Loading} alt="pushing to db" className="loadingGIF" />
      ) : (
        <button className="create" type="submit">
          Submit
        </button>
      )}
    </motion.form>
  );
}

export default NewUser;
