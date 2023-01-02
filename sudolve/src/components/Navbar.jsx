import React from "react";
import { useState } from "react";
import "../styles/Navbar.css";
const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  // shows or hides the sidebar
  const sidebarHandler = () => {
    setHidden(!hidden);
  };

  // Sets the classes for sidebar
  let navSidebarClasses;
  if (!hidden) {
    navSidebarClasses = "nav-sidebar";
  } else {
    navSidebarClasses = "nav-sidebar nav-sidebar-hidden";
  }

  return (
    <>
      <div className="nav-container">
        <div className="nav-flex-container">
          <div className="burger flex-item">
            <button className="nav-btns" onClick={sidebarHandler}>
              Burger
            </button>
          </div>
          <div className="nav-logo flex-item">SUDOLVE</div>
          <div className=" nav-buttons flex-item">
            <button className="nav-btns">A</button>
            <button className="nav-btns">B</button>
            <button className="nav-btns">C</button>
          </div>
        </div>
      </div>
      <div className={navSidebarClasses}>
        <div className="sidebar-flex">
          <button className="sidebar-flex-item">A</button>
          <button className="sidebar-flex-item">A</button>
          <button className="sidebar-flex-item">A</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
