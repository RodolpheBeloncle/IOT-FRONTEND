import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import Topbar from '../components/topbar/Topbar';
import { MyProSidebarProvider } from '../pages/sidebar/sidebarContext';

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuthentication } = useContext(UserContext);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <>
      <MyProSidebarProvider>
        <div className="app">
          <div style={{ height: '100%', width: '100%' }}>
            <main>
              <Topbar />
              <Navbar />
              <BreadCrumb />
              <Outlet />
            </main>
          </div>
        </div>
      </MyProSidebarProvider>
    </>
  );
};

export default ProtectedRoute;
