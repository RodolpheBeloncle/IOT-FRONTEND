import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const getCookie = (key) => {
    const cookie = document.cookie.match(
      '(^|;)\\s*' + key + '\\s*=\\s*([^;]+)'
    );
    console.log(cookie);
    const firstElement = cookie[0];
    const tokenIndex = firstElement.indexOf('token='); // Find the starting index of "token="
    const tokenValue = firstElement.substring(tokenIndex + 6);
    console.log('getcookie token', tokenValue);
    // setTokenAuth(tokenValue);

    // const cookieString = document.cookie; // Get the cookie string
    // const cookieArray = cookieString.split(';'); // Split the cookie string into an array of individual cookies
    // // Find the cookie with the name 'token' and extract its value
    // const tokenCookie = cookieArray.find((cookie) =>
    //   cookie.trim().startsWith('token')
    // );

    // if (tokenCookie) {
    //   const token = tokenCookie.split('=')[1];
    //   console.log('token', token);
    //   setTokenAuth(token);
    //   return token;
    // } else {
    //   return null;
    // }
  };

  const setCookie = (key, value) => {
    document.cookie = `${key}=${value}`;
    console.log('setcookie', document.cookie);
  };

  const removeCookie = (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;`;
  };

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
      // login(response.data.token, response.data.username);
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
        // setIsAuthenticated(true);
        // navigate('/');
        // return token;
      }
      // setIsAuthenticated(false);
      // navigate('/login');
      // return null;

      // if (!tokenAuth) {
      //   setIsAuthenticated(false);
      //   navigate('/login');
      // }else if()

      // const decodedToken = jwtDecode(tokenAuth);
      // console.log('decoded token', decodedToken);
      // const currentTime = Date.now() / 1000;

      // if (decodedToken.exp < currentTime) {
      //   setIsAuthenticated(false);
      //   removeCookie('token');
      //   navigate('/login');
      // }
      // setIsAuthenticated(true);
      // navigate('/');
    } catch (error) {
      console.log('message error : ', error);
      // alert(error);
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
        removeCookie,
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
