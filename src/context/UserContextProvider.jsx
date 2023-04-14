import React, { createContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { checkAuthentication, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuthentication();
    console.log('User context is auth ? ', isAuthenticated);
  }, [isAuthenticated]);
  return (
    <UserContext.Provider value={useAuth()}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
