import React, { createContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { checkAuthentication , isAuthenticated} = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);
  return (
    <UserContext.Provider value={useAuth()}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
