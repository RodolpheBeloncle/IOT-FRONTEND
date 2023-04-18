import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import SideMenuBar from '../components/nav/SideMenuBar';
import Topbar from '../components/nav/Topbar';

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuthentication } = useContext(UserContext);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <>
      <div className="app">
        <SideMenuBar />
        <div className="main-container">
          <Topbar />
          <Navbar />
          <BreadCrumb />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
