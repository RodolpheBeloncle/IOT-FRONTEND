import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import {
  Navigate,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import Topbar from '../components/topbar/Topbar';
import { MyProSidebarProvider } from '../pages/sidebar/sidebarContext';

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    getCookie,
    removeCookie,
    checkAuthentication,
    // setCookie,
    tokenAuth,
    setTokenAuth,
  } = useContext(UserContext);
  // let [searchParams, setSearchParams] = useSearchParams();
  // const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    // checkAuthentication();
    // console.log('token protected route', tokenAuth);
    // console.log('protected route', isAuthenticated);
    const cookieString = document.cookie; // Get the cookie string
    const cookieArray = cookieString.split(';'); // Split the cookie string into an array of individual cookies
    // Find the cookie with the name 'token' and extract its value
    const tokenCookie = cookieArray.find((cookie) =>
      cookie.trim().startsWith('token=')
    );

    console.log('token', tokenCookie);
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      console.log('token', jwtDecode(token));
      setTokenAuth(token);
      setIsAuthenticated(true);
      navigate('/');
    }else{
       setIsAuthenticated(false);
    navigate('/login');

    }
   
  }, []);

  // return tokenAuth ? (
  //   <>
  //     <MyProSidebarProvider>
  //       <div className="app">
  //         <div style={{ height: '100%', width: '100%' }}>
  //           <main>
  //             <Topbar />
  //             <Navbar />
  //             <BreadCrumb />
  //             <Outlet />
  //           </main>
  //         </div>
  //       </div>
  //     </MyProSidebarProvider>
  //   </>
  // ) : (
  //   <Navigate to="/login" />
  // );
  return (
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
