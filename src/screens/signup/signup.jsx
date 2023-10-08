import React from "react";
import styles from "./signup.module.css";

const SignupForm = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.signinSection}>
        <div className={styles.formSection}>
          <h2 className={styles.heading}>Create an Account</h2>
          <p className={styles.p}>Your personal job finder is here</p>

          <form
            className={styles.form}
            method="POST"
            action="http://localhost:4000/api/signup"
          >
            <div className={styles.inputField}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
            <div className={styles.inputField}>
              <input type="email" name="email" placeholder="email" required />
            </div>
            <div className={styles.inputField}>
              <input
                type="password"
                name="password"
                placeholder="password"
                required
              />
            </div>
            <div>
              <label className={styles.label} style={{ display: "flex" }}>
                <input type="checkbox" name="recruiter" />
                <span style={{ marginLeft: "4px" }}>Are you a Recruiter?</span>
              </label>
            </div>

            <div>
              <label className={styles.label} style={{ display: "flex" }}>
                <input type="checkbox" required />
                <span style={{ marginLeft: "4px" }}>
                  By creating an account, I agree to our terms of use and
                  privacy policy
                </span>
              </label>
            </div>

            <div>
              <button className={styles.btn} type="submit">
                Create Account
              </button>
            </div>
          </form>
          <p style={{ fontSize: ".8rem" }}>
            Already have an account?{" "}
            <a href="/" className={styles.link}>
              Log In
            </a>
          </p>
        </div>
      </div>
      <div className={styles.image}></div>
    </div>
  );
};

export default SignupForm;
