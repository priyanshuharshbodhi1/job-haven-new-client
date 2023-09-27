import React from "react";
import styles from "./jobfinder.module.css";

function jobfinder() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItems}>
          <div className={styles.logo} style={{fontSize:"1.4rem"}}>JobHaven</div>
          <div>
            <button className={styles.loginBtn}>Login</button>
            <button className={styles.registerBtn}>Register</button>
          </div>
          {/* <button className={styles.logout}>Logout</button> */}
          {/* <img src="" alt="Profile Photo" /> */}
        </div>
      </div>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}></div>
        <div>
            <div className={styles.skillSelection}></div>
            <button className={styles.addJobBtn}>+Add Job</button>
        </div>
      </div>
      <div className={styles.jobList}>
        
      </div>
    </div>
  );
}

export default jobfinder;
