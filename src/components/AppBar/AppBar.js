import React from 'react';
import styles from './AppBar.less';
import { ReactComponent as TeslaLogo } from '../../images/tesla-logo.svg';

const AppBar = ({ logOut }) => (
  <div className={styles.appBarContainer}>
    <a href="/">
      <div className={styles.logoContainer}>
        <TeslaLogo className={styles.teslaLogo} />
        TeslaControl
      </div>
    </a>
    <div className={styles.logOut} onClick={logOut}>
      Log Out
    </div>
  </div>
);

export default AppBar;
