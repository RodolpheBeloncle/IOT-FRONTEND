import { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import { UserContext } from '../context/UserContextProvider';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userContext = useContext(UserContext);

  const login = (token, username) => {
    document.cookie = `token=${token}`;
    document.cookie = `username=${username}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
    document.cookie =
      'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
    setIsAuthenticated(false);
  };

  const checkAuthentication = async () => {
    document.cookie = `token=${token}`;
    const token = document.cookie.token;
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    checkAuthentication,
  };
};
