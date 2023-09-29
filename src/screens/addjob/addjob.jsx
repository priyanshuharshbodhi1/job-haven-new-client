import React from 'react';

function AddJob() {
  return (
    <div>
      <form action="http://localhost:4000/api/jobpost" method="POST">
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Enter your company name here"
          required
        /> <br />
      
        <label htmlFor="logoURL">Add logo URL:</label>
        <input
          type="text"
          id="logoURL"
          name="logoURL"
          placeholder="Enter the link"
        /><br />
      
        <label htmlFor="jobPosition">Job Position:</label>
        <input
          type="text"
          id="jobPosition"
          name="jobPosition"
          placeholder="Enter job position"
          required
        /><br />
      
        <label htmlFor="monthlySalary">Monthly Salary:</label>
        <input
          type="text"
          id="monthlySalary"
          name="monthlySalary"
          placeholder="Enter amount in rupees"
          required
        /><br />
      
        <label htmlFor="jobType">Job Type:</label>
        <select id="jobType" name="jobType">
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select><br />
      
        <label htmlFor="remoteOffice">Remote/Office:</label>
        <select id="remoteOffice" name="remoteOffice">
          <option value="remote">Remote</option>
          <option value="office">Office</option>
          <option value="hybrid">Hybrid</option>
        </select><br />
      
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter location"
        /><br />
      
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Type the job description"
          required
        ></textarea><br />
      
        <label htmlFor="companyDescription">About Company:</label>
        <textarea
          id="companyDescription"
          name="companyDescription"
          placeholder="Type about your company"
          required
        ></textarea><br />
      
        <label htmlFor="skillsRequired">Skills Required:</label>
        <input
          type="text"
          id="skillsRequired"
          name="skillsRequired"
          placeholder="Enter the must-have skills"
          required
        /><br />
      
        <label htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Enter additional information"
        ></textarea><br />
      
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddJob;