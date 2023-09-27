import React from 'react'
// import styles from './Login.module.css'

const Login = () => {
 

  return (
    <div>
      <h2>Authentication</h2>
      <form method="POST" action="http://localhost:4000/api/login">
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
          <button type="submit">Log In</button>
        </div>
      </form>
      <p>Don’t have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;