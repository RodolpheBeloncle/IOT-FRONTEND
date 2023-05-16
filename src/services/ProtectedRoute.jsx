import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import Navbar from '../components/navbar/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import Topbar from '../components/topbar/Topbar';
import { MyProSidebarProvider } from '../pages/sidebar/sidebarContext';


const ProtectedRoute = ({ isAuthenticated }) => {
  const {
    setTokenAuth,
    getCookie,
    clearCookie,
    setUserInfo,
    setIsAuthenticated,
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
          picture,
          email,
          role:"admin",
          username,
        });
        setTokenAuth(token);
        setIsAuthenticated(true);
        navigate('/');
      }
    }
    isAuthenticated &&
      googleAuth &&
      message.success('google authenticated successfully!', 1);
    isAuthenticated &&
      !googleAuth &&
      message.success('successfully logged in !', 1);
  }, []);
  console.log('protectedroute', isAuthenticated);

  return isAuthenticated === true ? (
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
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
