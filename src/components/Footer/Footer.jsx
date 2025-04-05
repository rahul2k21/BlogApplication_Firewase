import React from "react";
import style from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer_container}>
        <div className={style.footer_about}>
          <h3>About This Blog</h3>
          <p>
            Sharing thoughts, tutorials, and ideas on web development, design,
            and life.
          </p>
        </div>

        <div className={style.footer_contact}>
          <h3>Contact</h3>
          <p>Email: rahulmandal2k21@gmail.com</p>
          <p>Phone: +91 9756964307</p>
        </div>

        <div className={style.footer_social}>
          <h3>Follow Us</h3>
          <div className={style.social_icons}>
            <a
              href="https://www.facebook.com/rahulmandal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/rahulmandal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/rahulmandal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/rahul2k21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className={style.footer_bottom}>
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
