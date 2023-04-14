import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/BreadCrumb';

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuthentication } = useContext(UserContext);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <Navigate to="/login" />
   
  ) : (
    <>
      <Navbar />
      <BreadCrumb />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoute;
