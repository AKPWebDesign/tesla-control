import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import TeslaAPI from '../adapters/TeslaAPI';
import useTeslaAuth from '../hooks/useTeslaAuth';
import TeslaLogo from '../images/tesla-red.png';
import styles from './LoginPage.less';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn } = useTeslaAuth();

  const onLogin = (e) => {
    e.preventDefault();
    TeslaAPI.login(username, password);
  };

  if (isLoggedIn) {
    return <Redirect to="/vehicles" />;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <div className={styles.teslaLogoContainer}>
          <img className={styles.teslaLogo} src={TeslaLogo} alt="Tesla Logo" />
        </div>

        <form onSubmit={onLogin} className={styles.loginForm}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Email Address"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
