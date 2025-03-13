import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';
import loginBackground from '../assets/images/loginBackground.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Admin@3398') {
      // Set the login flag in session storage
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="lgn-container" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className="lgn-form-container">
        <h2 className="lgn-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="lgn-form">
          {error && <div className="lgn-error">{error}</div>}
          <div className="lgn-input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="lgn-input"
              required
            />
          </div>
          <div className="lgn-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="lgn-input"
              required
            />
          </div>
          <button type="submit" className="lgn-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;