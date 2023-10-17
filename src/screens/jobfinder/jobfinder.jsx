import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import styles from "./jobfinder.module.css";
import { Link } from "react-router-dom"; //, useHistory
import axios from "axios";
import Cookies from "js-cookie";

function Jobfinder() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [user, setUser] = useState({ name: "" });
  const [showRecruiterMessage, setShowRecruiterMessage] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
    "Web",
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
  const [jobData, setJobData] = useState([]);
  const dropdownRef = useRef(null);

  // {`${process.env.REACT_APP_API_BASE_URL}/api/login`}

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/joblist`, {
        params: { selectedSkills: selectedSkills.join(",") }, // Send selected skills as a comma-separated string
      })
      .then((response) => {
        setJobData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, [selectedSkills]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/joblist`, {
        params: { selectedSkills: selectedSkills.join(",") },
      })
      .then((response) => {
        const filteredJobs = response.data.filter((job) =>
          job.jobPosition.toLowerCase().includes(searchInput.toLowerCase())
        );
        setJobData(filteredJobs);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, [selectedSkills, searchInput]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isloggedin`, {
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isrecruiter`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isRecruiter === true) {
          setIsRecruiter(true);
        } else {
          setIsRecruiter(false);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // const history = useHistory();

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, { withCredentials: true })
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
      <Header
        isLoggedIn={isLoggedIn}
        isRecruiter={isRecruiter}
        user={user}
        handleLogout={handleLogout}
      />
      <div className={styles.secondContainer}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input
              type="search"
              className={styles.searchBarInput}
              placeholder="Type any job title"
              value={searchInput}
              onChange={handleSearchInputChange}
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
                    style={{ cursor: "pointer" }}
                  >
                    &#10006; {/* Unicode character for 'x' */}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div>
                {isRecruiter ? ( // Display the "Add Job" button
                  <Link to="/addjob">
                    <button className={styles.addJobBtn}>+Add Job</button>
                  </Link>
                ) : (
                  <div
                    className={styles.addJobContainer}
                    onMouseEnter={() => setShowRecruiterMessage(true)}
                    onMouseLeave={() => setShowRecruiterMessage(false)}
                  >
                    <button
                      className={styles.addJobBtn}
                      style={{
                        backgroundColor: "#9c9c9c",
                        cursor: "not-allowed",
                      }}
                    >
                      +Add Job
                    </button>
                    {showRecruiterMessage && (
                      <div className={styles.recruiterMessage}>
                        Only recruiters can add a job on JobHaven
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.jobListContainer}>
          {jobData.length === 0 ? ( // Check if jobData is empty
            <p className={styles.noJobPara}>
              Sorry, no jobs available for the skills you selected!
            </p>
          ) : (
            jobData.map((job) => (
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
                  <div style={{ marginLeft: "auto" }}>
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
                    <Link to={`/viewjob/${job._id}`}>
                      <button className={styles.viewDetailsBtn}>
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobfinder;
