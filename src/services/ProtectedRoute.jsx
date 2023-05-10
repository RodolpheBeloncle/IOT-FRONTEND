import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import Navbar from '../components/navbar/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import Topbar from '../components/topbar/Topbar';
import { MyProSidebarProvider } from '../pages/sidebar/sidebarContext';

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setTokenAuth,
    getCookie,
    clearCookie,
    setUserInfo,
  } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    const googleAuth = getCookie('googleAuth');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setIsAuthenticated(false);
        clearCookie('token');
        clearCookie('googleAuth');
        navigate('/login');
      } else {
        const { username, email, role, picture } = jwtDecode(token);
        setUserInfo({
          email: email,
          //! reset role JsonServer
          role: "Admin",
          // username: username,
          username: email,
          picture: picture,
        });
        setTokenAuth(token);
        setIsAuthenticated(true);
        navigate('/');
      }
    } else {
      setIsAuthenticated(false);
      clearCookie('token');
      clearCookie('googleAuth');
      navigate('/login');
    }
    isAuthenticated &&
      googleAuth &&
      message.success('google authenticated successfully!', 1);
    isAuthenticated &&
      !googleAuth &&
      message.success('successfully logged in !', 1);
  }, [isAuthenticated]);

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
