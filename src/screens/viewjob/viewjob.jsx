import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import styles from "./viewjob.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import stipendImage from "../../assets/images/stipend.svg";

function ViewJob() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [user, setUser] = useState({ name: "" });
  const [jobDetails, setJobDetails] = useState(null);
  const { jobId } = useParams(); // Get the job ID from the route parameters

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isloggedin`, {
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isrecruiter`, {
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

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/jobdetails/${jobId}`)
      .then((response) => {
        setJobDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [jobId]);

  


  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwt");
          setIsLoggedIn(false);
          console.log("User is logged out");
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

      {jobDetails ? (
        <div className={styles.container}>
          <div className={styles.title}>
            <p>
              {jobDetails.jobPosition} {jobDetails.jobType}{" "}
              {jobDetails.remoteOffice} job/internship at{" "}
              {jobDetails.companyName}
            </p>
          </div>

          <div className={styles.description}>
            <div className={styles.typeAndTime}>
              <div className={styles.jobType}>{jobDetails.jobType}</div>
              <div className={styles.remoteOffice}>
                {jobDetails.remoteOffice}
              </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div className={styles.mainTitle}>{jobDetails.jobPosition}</div>
              {isRecruiter && (
                      <button
                        style={{
                          marginRight: ".5rem",
                          background: "#fff",
                          color: "#ed5353",
                          border: " 1.5px solid #ed5353",
                        }}
                        className={styles.viewDetailsBtn}
                      >
                        Edit Job
                      </button>
                    )}
            </div>
            <div className={styles.location}>{jobDetails.location}</div>
            <br />
            <div className={styles.stipendAndDuration}>
              <div className={styles.salary}>
                <div className={styles.stipendImage}>
                  <img src={stipendImage} alt="Stipend Icon" />
                </div>
                <div>
                  <span>&#8377;</span>&nbsp;{jobDetails.monthlySalary}/month
                </div>
              </div>
              <div className={styles.duration}>{jobDetails.duration}</div>
            </div>
            <div className={styles.companyDescription}>
              <h4>About Company</h4>
              {jobDetails.companyDescription}
            </div>
            <div className={styles.jobDescription}>
              <h4>About the job/internship</h4>
              {jobDetails.jobDescription}
            </div>
            <div className={styles.skillRequired}>
              <h4>Skill(s) required</h4>
              {jobDetails.skillsRequired.split(",").map((skill, index) => (
                <span className={styles.skillItem} key={index}>
                  {skill.trim()}
                </span>
              ))}
            </div>

            {jobDetails.additionalInfo &&
              jobDetails.additionalInfo.trim() !== "" && (
                <div className={styles.additionalInformation}>
                  <h4>Additional Information</h4>
                  {jobDetails.additionalInfo}
                </div>
              )}
          </div>
        </div>
      ) : (
        <p style={{ margin: "2rem auto" }}>Loading job details...</p>
      )}
    </div>
  );
}

export default ViewJob;
