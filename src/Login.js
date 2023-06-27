import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'foo' && password === 'bar') {
      // Psudo authentication logic
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
    <div className='login'>
      <h2>Login</h2>
      <div className="user-box">

      <input
        type="text"
        placeholder=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Username</label>
      </div>
      <div className="user-box">

      <input
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Password</label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default Login;
