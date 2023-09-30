import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginSection}>
        <div className={styles.formSection}>
          <h2 className={styles.heading}>Already have an account?</h2>
          <p className={styles.p}>Your personal job finder is here</p>
          <form
            className={styles.form}
            method="POST"
            action="http://localhost:4000/api/login"
          >
            <div style={{marginTop:"1rem",marginBottom:"1rem", display:"flex", flexDirection:"column"}}>
              <div style={{marginBottom:".8rem"}} className={styles.inputField}>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className={styles.inputField}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div>
              <button className={styles.btn} type="submit">
                Log In
              </button>
            </div>
          </form>
          <p style={{ fontSize: ".8rem" }}>
            Don’t have an account?{" "}
            <a href="/signup" className={styles.link}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className={styles.image}></div>
    </div>
  );
};

export default Login;
