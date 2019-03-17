import React, { Suspense } from 'react';
import classNames from 'classnames';
import {
  Redirect, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import TeslaAPI from './adapters/TeslaAPI';
import useTeslaAuth from './hooks/useTeslaAuth';
import styles from './App.less';

const AppBar = React.lazy(() => import('./components/AppBar/AppBar' /* webpackChunkName: "appBar" */));
const VehicleInfoPage = React.lazy(() => import('./containers/VehicleInfoPage' /* webpackChunkName: "vehicleInfoPage" */));
const VehicleListPage = React.lazy(() => import('./containers/VehicleListPage' /* webpackChunkName: "vehicleListPage" */));
const LoginPage = React.lazy(() => import('./containers/LoginPage' /* webpackChunkName: "loginPage" */));

const App = () => {
  const { isLoggedIn } = useTeslaAuth();

  const classes = classNames(styles.appContainer, { [styles.isLoggedIn]: isLoggedIn });

  return (
    <Suspense className={classes} fallback={<div>Loading...</div>}>
      <Router>
        { isLoggedIn && <AppBar logOut={() => TeslaAPI.logout()} /> }

        <Switch>
          <Route exact path="/vehicles" component={VehicleListPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/vehicle/:vehicleId" component={VehicleInfoPage} />
          <Route render={() => (
            isLoggedIn ? (
              <Redirect to="/vehicles" />
            ) : (
              <Redirect to="/login" />
            )
          )}
          />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
