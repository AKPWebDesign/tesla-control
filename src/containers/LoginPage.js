import React, { useState } from 'react';
import TeslaAPI from '../adapters/TeslaAPI';
import TeslaLogo from '../images/tesla-red.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    TeslaAPI.login(username, password);
  }

  return (
    <div className="login-page">
      <div className="tesla-logo-container">
        <img className="tesla-logo" src={TeslaLogo} alt="Tesla Logo" />
      </div>

      <div className="login-form-container">
        <form onSubmit={onLogin}>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;
