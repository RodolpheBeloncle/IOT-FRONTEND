import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/BreadCrumb';

const ProtectedRoute = ({ isAuthenticated }) => {
  useEffect(() => {
    console.log('pass the protected route ', isAuthenticated);
  }, []);

  // true ? (
  //   <>
  //     <Navbar />
  //     {/* <BreadCrumb /> */}
  //     {/* <Sidebar /> */}
  //     <p>is Authorized</p>
  //     {/* <Outlet /> */}
  //   </>
  // ) : (
  //   // <Navigate to="/login" />
  //   <p>protected routes</p>
  // );
  {
    /* <BreadCrumb /> */
  }
  {
    /* <Sidebar /> */
  }
  <p>is Authorized</p>;
  {
    /* <Outlet /> */
  }
  return isAuthenticated ? <Navbar /> : <p>is not Authorized</p>;
};

export default ProtectedRoute;
