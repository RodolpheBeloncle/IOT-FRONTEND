import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (token, username) => {
    try {
      Cookies.set('token', token);
      Cookies.set('username', username);

      setIsAuthenticated(true);
    } catch (error) {
      console.log('login error: ', error);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove('token');
      Cookies.remove('username');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('logout error : ', error);
    }
  };

  const checkAuthentication = async () => {
    try {
      console.log('Cookies token', Cookies.get('token'));
      const token = await Cookies.get('token');
      // const googleToken = Cookies.get('connect.sid');
      console.log('checkAuthentication', token);

      console.log('decoded checkAuthentication : ', jwtDecode(token));
      if (token) {
        const decodedToken = await jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          Cookies.remove('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('checkAuthentication error : ', error.message);
    }
  };

  useEffect(() => {
    console.log('User context is auth ? ', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        checkAuthentication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
