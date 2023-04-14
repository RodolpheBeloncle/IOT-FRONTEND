import { useState, useContext } from 'react';
import Cookies from 'js-cookie';

import { UserContext } from '../context/UserContextProvider';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userContext = useContext(UserContext);

  const login = (token,username) => {
    Cookies.set('token', token);
    Cookies.set('username', username);

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsAuthenticated(false);
  };

  const checkAuthentication = () => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    checkAuthentication,
  };
};
