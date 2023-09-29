import React, { useState, useRef, useEffect } from "react";
import styles from "./jobfinder.module.css";
import { Link } from "react-router-dom";

function Jobfinder() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
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
          <div style={{display:"flex"}}>
            <Link to="/">
              <button className={styles.loginBtn}>Login</button>
            </Link>
            <Link to="/signup">
              <button className={styles.registerBtn}>Register</button>
            </Link>
            {/* <button className={styles.logout}>Logout</button> */}
            {/* <img src="" alt="Profile Photo" /> */}
          </div>
        </div>
      </div>
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
      <div className={styles.jobList}></div>
    </div>
  );
}

export default Jobfinder;
