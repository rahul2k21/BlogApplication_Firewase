import React from "react";
import styles from "./ServicePage.module.css";

const services = [
  {
    title: "Web Development",
    description: "Building responsive and modern websites.",
  },
  {
    title: "App Development",
    description: "Creating mobile apps for iOS and Android.",
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces.",
  }
];

function ServicePage() {
  return (
    <div className={styles.serviceWrapper}>
      <h1 className={styles.heading}>Our Services</h1>
      <div className={styles.serviceGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicePage;
