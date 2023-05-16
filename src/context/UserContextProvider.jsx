import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [tokenAuth, setTokenAuth] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    role: '',
    username: '',
    picture: '',
  });
  const navigate = useNavigate();

  function clearCookie(cookie) {
    return Cookies.remove(cookie);
  }

  function getCookie(cookie) {
    return Cookies.get(cookie);
  }

  function setCookie(key, value) {
    Cookies.set(key, value, { expires: 7 });
  }

  const handleLogout = async () => {
    try {
      clearCookie('token');
      clearCookie('googleAuth');
      setIsAuthenticated(false);
      message.success('successfully logout !', 2);
      navigate('/login');
    } catch (error) {
      console.log('logout error : ', error);
      message.error(error, 2);
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
        handleLogout,
        getCookie,
        setCookie,
        clearCookie,
        checkAuthentication,
        tokenAuth,
        setTokenAuth,
        userInfo,
        setUserInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
