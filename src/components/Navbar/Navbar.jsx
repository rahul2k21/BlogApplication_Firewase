import React, { useState } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useFirebase } from "../../context/firebase"; // Adjust the path to your context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignUp = () => {
    if (firebase.isLoggedIn) {
      firebase.logout(); // Logout if user is logged in
    }
    navigate("/register"); // Navigate to register page
  };

  return (
    <nav className={style.navbar}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className={style.navbar_brand}>BlogNestPage</div>

      <ul className={`${style.navbar_links} ${isOpen ? style.active : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/service">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className={style.navbar_buttons}>
        <Link to="/register">
          <button className={style.btn}>Sign In</button>
        </Link>
        <button
          className={`${style.btn} ${style.signup}`}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>

      <button className={style.navbar_toggle} onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  );
};

export default Navbar;
