import React from "react";
import "./NavBar.css";
import { useUserContext } from "../../lib/UserContext";
import { useStateContext } from "../../lib/context";
import Close from "../../../public/images/cancel.png";
import { adminNavItems, clientNavItems } from "../../utils/navList";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const { toggleNavIsActive, navIsActive } = useStateContext();
  const { myUser, role } = useUserContext();
  const profilePicture = myUser.picture;
  console.log(role);
  console.log(role === "admin");
  const navItems = role === "admin" ? adminNavItems : clientNavItems;
  console.log("nav items", navItems);

  const toggle = () => {
    toggleNavIsActive();
  };

  return (
    <div className="navContainer">
      <div className="navBar">
        {navIsActive ? (
          <img
            src={Close}
            alt="close nav bar"
            className="profilePicture"
            onClick={toggle}
          />
        ) : (
          <img
            src={profilePicture}
            alt="profile picture"
            className="profilePicture"
            onClick={toggle}
          />
        )}
      </div>
      <AnimatePresence>
        {navIsActive ? (
          <motion.ul
            className="navContent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {navItems.map((x) => {
              const [key, value] = Object.entries(x)[0];
              console.log(value);
              return (
                <li key={"navItem" + key} className="listItem">
                  <Link to={value} className="navItem" onClick={toggle}>
                    {key}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default NavBar;
