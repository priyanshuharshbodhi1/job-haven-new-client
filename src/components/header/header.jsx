// Header.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function header({ isLoggedIn, handleLogout, isRecruiter, user }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerItems}>
        <div className={styles.logo} style={{ fontSize: "1.4rem" }}>
          JobHaven
        </div>
        <div style={{ display: "flex" }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button className={styles.loginBtn} onClick={handleLogout}>
                Logout
              </button>
              <span style={{ color: "white" }}>
                {isRecruiter ? "Hello Recruiter!" : `Hello ${user}!`}
              </span>
            </div>
          ) : (
            <>
              <Link to="/">
                <button className={styles.loginBtn}>Login</button>
              </Link>
              <Link to="/signup">
                <button className={styles.registerBtn}>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default header;
