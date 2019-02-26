import { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import TeslaAPI from '../adapters/TeslaAPI';

const useAuthState = createPersistedState('tesla-auth');

const useTeslaAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useAuthState(null);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
      TeslaAPI.setAuth(userData.access_token);
    }

    const unsubscribe = TeslaAPI.subscribeToAuthChanges((loggedIn, data) => {
      setIsLoggedIn(loggedIn);
      setUserData(data || null);
    });

    return () => {
      unsubscribe();
    }
  });

  return { isLoggedIn, userData };
};

export default useTeslaAuth;
