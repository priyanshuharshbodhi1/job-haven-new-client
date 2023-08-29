import React from "react";

const SignupForm = () => {

  return (
    <div>
      <h2>Create an Account</h2>
      <form method="POST" action={process.env.REACT_APP_BACKEND_URL+"api/signup"}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              required
            />{" "}
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
      <p>
        Already have an account? <a href="/">Log In</a>
      </p>
    </div>
  );
};

export default SignupForm;
