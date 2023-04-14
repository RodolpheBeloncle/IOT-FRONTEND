import { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import { UserContext } from '../context/UserContextProvider';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userContext = useContext(UserContext);

  const login = (token, username) => {
    Cookies.set('token', token);
    Cookies.set('username', username);

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsAuthenticated(false);
  };

  const checkAuthentication = async () => {
    const token = Cookies.get('token');
   
    console.log('decoded token : ', jwtDecode(token));
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          Cookies.remove('token');
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('error token', error.message);
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
