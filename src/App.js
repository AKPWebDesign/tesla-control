import React from 'react';
import LoginPage from './containers/LoginPage';
import VehicleInfoPage from './containers/VehicleInfoPage';
import useTeslaAuth from './hooks/useTeslaAuth';
import './App.css';

const App = () => {
  const { isLoggedIn } = useTeslaAuth();

  return isLoggedIn ? <VehicleInfoPage /> : <LoginPage />;
}

export default App;
