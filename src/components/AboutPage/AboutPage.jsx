import React from "react";
import styles from "./Aboutpage.module.css";

function AboutPage() {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <h1>About This Blog</h1>
        <p>
          Welcome to our blog! We're passionate about web development, design,
          and sharing ideas with the tech community. Whether you're a beginner
          or an experienced developer, you'll find useful tips, tutorials, and
          stories to inspire and educate.
        </p>
        <p>
          This blog was started with the intention of helping others grow in
          their coding journey. We believe in continuous learning, community
          support, and the power of sharing knowledge.
        </p>
        <p>
          Feel free to explore, leave comments, and reach out if you'd like to
          collaborate or contribute.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
