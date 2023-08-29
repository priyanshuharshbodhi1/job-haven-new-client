import React,{ useState } from 'react'
import axios from 'axios';
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.error.message);
    }
    setEmail('')
    setPassword('')
  };

  return (
    <div>
      <h2>Authentication</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
      <p>Don’t have an account? <a href="#">Sign Up</a></p>
    </div>
  );
};

export default Login;