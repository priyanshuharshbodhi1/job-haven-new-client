import React from "react";
import Header from "../../components/header/header.jsx";
import styles from "./viewjob.module.css";

function ViewJob() {
  return (
    <div className={styles.mainContainer}>
      <Header />

      <div className={styles.title}>
        <h1>Your Title Here</h1>
      </div>

      <div className={styles.description}>
        <p>Your Description Here</p>
      </div>
    </div>
  );
}

export default ViewJob;
