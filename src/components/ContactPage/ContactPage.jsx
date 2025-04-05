import React from "react";
import styles from "./ContactPage.module.css";

function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! Please fill out the form or reach out
            using the info below.
          </p>
          <div className={styles.infoGroup}>
            <p>
              <strong>Email:</strong> rahulmandal2k21@example.com
            </p>
            <p>
              <strong>Phone:</strong> +91 9756964307
            </p>
            <p>
              <strong>Address:</strong>  Dehradun, Uttarakhand ,India
            </p>
          </div>
        </div>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
