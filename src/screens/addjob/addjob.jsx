import React from "react";
import styles from "./addjob.module.css";


function AddJob() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formSection}>
        <form
          action={`${process.env.REACT_APP_API_BASE_URL}/api/jobpost`}
          method="POST"
          style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
        >
          <h2 style={{ margin: ".4rem 0" }}>Add job description</h2>
          <div>
            <label htmlFor="companyName">Company Name*:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter your company name here"
              required
            />{" "}
          </div>
          <div>
            <label htmlFor="logoURL">Upload Logo*:</label>
            <input type="text" id="logoURL" name="logoURL" placeholder="Enter Logo Url" required />
          </div>
          <div>
            <label htmlFor="jobPosition">Job Position*:</label>
            <input
              type="text"
              id="jobPosition"
              name="jobPosition"
              placeholder="Enter job position"
              required
            />
          </div>
          <div>
            <label htmlFor="monthlySalary">Monthly Salary*:</label>
            <input
              type="number"
              id="monthlySalary"
              name="monthlySalary"
              placeholder="Enter amount in rupees"
              inputMode="numeric"
              max="100000000"
              required
            />
          </div>
          <div>
            <label htmlFor="jobType">Job Type*:</label>
            <select id="jobType" name="jobType">
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div>
            <label htmlFor="remoteOffice">Remote/Office*:</label>
            <select id="remoteOffice" name="remoteOffice">
              <option value="remote">Remote</option>
              <option value="office">Office</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">Location*:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label htmlFor="jobDescription">Job Description*:</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Type the job description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="companyDescription">About Company:</label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              placeholder="Type about your company"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="skillsRequired">Skills Required*:</label>
            <input
              type="text"
              id="skillsRequired"
              name="skillsRequired"
              placeholder="Skills separated by commas (Format: 'Full Stack, C++')"
              required
            />
          </div>
          <div>
            <label htmlFor="additionalInfo">Additional Information:</label>
            <input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Enter additional information"
            />
          </div>
          <button type="submit" className={styles.addJobBtn}>
            Add Job
          </button>
        </form>
      </div>
      <div className={styles.sideImage}>
        <div className={styles.textOverlay}>Recruiter add job details here</div>
      </div>
    </div>
  );
}

export default AddJob;
