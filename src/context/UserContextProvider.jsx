import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [tokenAuth, setTokenAuth] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    role: '',
    username: '',
    picture: '',
  });

  function clearCookie(cookie) {
    Cookies.remove(cookie);
  }

  function getCookie(cookie) {
    return Cookies.get(cookie);
  }

  function setCookie(key, value) {
    Cookies.set(key, value, { expires: 7 });
  }

  const login = (token, username) => {
    setTokenAuth(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
    } catch (error) {
      console.log('logout error : ', error);
    }
  };

  const checkAuthentication = async () => {
    try {
   
      const cookieString = await document.cookie; // Get the cookie string
      const cookieArray = await cookieString.split(';'); // Split the cookie string into an array of individual cookies
      // Find the cookie with the name 'token' and extract its value
      const tokenCookie = await cookieArray.find((cookie) =>
        cookie.trim().startsWith('token=')
      );
      console.log('token', tokenCookie);
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        console.log('token', jwtDecode(token));
        setTokenAuth(token);
      }
    } catch (error) {
      console.log('message error : ', error);
    
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        getCookie,
        setCookie,
        clearCookie,
        checkAuthentication,
        tokenAuth,
        setTokenAuth,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
