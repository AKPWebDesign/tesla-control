import React from 'react';
import PropTypes from 'prop-types';
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
    <div className={styles.logOut} onClick={logOut} role="link" tabIndex="0" onKeyPress={logOut}>
      Log Out
    </div>
  </div>
);

AppBar.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default AppBar;
