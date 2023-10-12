import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import styles from "./viewjob.module.css";
import axios from "axios";
import Cookies from "js-cookie";
// import { Link } from "react-router-dom";

function ViewJob() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    // Check login status and user role (recruiter/other user)
    axios
      .get("http://localhost:4000/api/isloggedin", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        setUser(response.data.firstName);
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });

    axios
      .get("http://localhost:4000/api/isrecruiter", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isRecruiter === true) {
          setIsRecruiter(true);
        } else {
          setIsRecruiter(false);
        }
      })
      .catch((error) => {
        console.error("Error checking user role:", error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:4000/api/logout", null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwt");
          setIsLoggedIn(false);
          console.log("User is logged out");
          // history.push("/login"); // Navigate to /login
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <Header
        isLoggedIn={isLoggedIn}
        isRecruiter={isRecruiter}
        user={user}
        handleLogout={handleLogout}
      />

      <div className={styles.title}>
        <h3>Your Title Here</h3>
      </div>

      <div className={styles.description}>
        <p>Your Description Here</p>
      </div>
    </div>
  );
}

export default ViewJob;
