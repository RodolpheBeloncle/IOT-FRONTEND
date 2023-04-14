import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/BreadCrumb';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  isAuthenticated ? (
    <>
      <Navbar />
      {/* <BreadCrumb /> */}
      {/* <Sidebar /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
