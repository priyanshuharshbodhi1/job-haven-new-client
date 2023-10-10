import React, { useState, useRef, useEffect } from "react";
import styles from "./jobfinder.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Jobfinder() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [user, setUser] = useState({ name: "" });

  const skills = [
    "Front End",
    "Back End",
    "Full Stack",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "HTML/CSS",
    "Angular",
    "Vue.js",
    "Ruby on Rails",
    "PHP",
    "C#",
    "DevOps",
    "AWS",
    "Docker",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "Agile Methodology",
    "Scrum",
    "Kubernetes",
    "Cybersecurity",
    "Blockchain",
    "Mobile App Development",
    "Big Data",
    "Artificial Intelligence",
    "Cloud Computing",
  ];

  const dropdownRef = useRef(null);

  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/joblist")
      .then((response) => {
        setJobData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/isloggedin", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        setUser(response.data.firstName);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/isrecruiter", {
        withCredentials: true,
      })
      .then((response) => {
        setIsRecruiter(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  //greeting to the user or recruiter
  let greeting = "";
  if (isLoggedIn) {
    if (isRecruiter) {
      greeting = "Hello Recruiter!";
    } else {
      greeting = `Hello ${user}!`;
    }
  }

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItems}>
          <div className={styles.logo} style={{ fontSize: "1.4rem" }}>
            JobHaven
          </div>
          <div style={{ display: "flex" }}>
          {isLoggedIn ? (
              <>
                <button className={styles.loginBtn}>Logout</button>
                <span>{greeting}</span>
              </>
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
      <div className={styles.secondContainer}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input
              type="search"
              className={styles.searchBarInput}
              placeholder="Type any job title"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <div className={styles.skillSelection}>
              <div
                className={styles.customSelect}
                id="skillsDropdown"
                ref={dropdownRef}
              >
                <button
                  className={styles.dropBtn}
                  onClick={() => setDropdownVisible(!isDropdownVisible)}
                >
                  Select Skills
                </button>
                {isDropdownVisible && (
                  <div className={styles.dropdownContent}>
                    <div className={styles.checkboxContainer}>
                      {skills.map((skill) => (
                        <label key={skill}>
                          <input
                            type="checkbox"
                            value={skill}
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                          />{" "}
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.checkedSkills}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {selectedSkills.map((skill) => (
                <div key={skill} className={styles.checkedSkill}>
                  <span
                    className={styles.selectedSkillSpan}
                    style={{
                      padding: ".6rem .8rem",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {skill}
                  </span>
                  <button
                    className={styles.removeSkillBtn}
                    onClick={() => removeSkill(skill)}
                  >
                    &#10006; {/* Unicode character for 'x' */}
                  </button>
                </div>
              ))}
            </div>
            <Link to="/addjob">
              <button class={styles.addJobBtn}>+Add Job</button>
            </Link>
          </div>
        </div>
        <div className={styles.jobListContainer}>
          {jobData
            // .sort(() => Math.random() - .5) // Shuffle the array
            .map((job) => (
              <div key={job._id} className={styles.jobList}>
                <div className={styles.leftSide} style={{ display: "flex" }}>
                  <div
                    className={styles.logo}
                    style={{ backgroundImage: `url(${job.logoURL})` }}
                  ></div>
                  <div
                    className={styles.jobInfo}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".3rem",
                    }}
                  >
                    <div className={styles.jobPosition}>
                      <b>{job.jobPosition}</b>
                    </div>
                    <div
                      className={styles.salaryAndLocation}
                      style={{ display: "flex" }}
                    >
                      <div className={styles.salary}>
                        <span>&#8377;</span>&nbsp;{job.monthlySalary}
                      </div>
                      <div className={styles.location}>{job.location}</div>
                    </div>
                    <div
                      className={styles.timeAndRemote}
                      style={{ display: "flex" }}
                    >
                      <div className={styles.time}>{job.jobType}</div>
                      <div className={styles.remote}>{job.remoteOffice}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.rightSide}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.skills}>
                    {job.skillsRequired.split(",").map((skill) => (
                      <span key={skill.trim()} className={styles.skill}>
                        {skill
                          .trim()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    ))}
                  </div>
                  <button className={styles.viewDetailsBtn}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Jobfinder;
