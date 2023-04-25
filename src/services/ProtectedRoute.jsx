import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { message, Button } from 'antd';
import jwtDecode from 'jwt-decode';
import Navbar from '../components/Navbar';
import BreadCrumb from '../components/breadCrumb/BreadCrumb';
import Topbar from '../components/topbar/Topbar';
import { MyProSidebarProvider } from '../pages/sidebar/sidebarContext';

const ProtectedRoute = () => {
  const { setIsAuthenticated, setTokenAuth, setUserInfo, getCookie } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  let googleAuth = getCookie('googleAuth');
  let tokencookie = getCookie('token');
  // console.log('googleAuth', googleAuth);
  // console.log('cookietoken', tokencookie);

  useEffect(() => {
    const cookieString = document.cookie; // Get the cookie string
    const cookieArray = cookieString.split(';'); // Split the cookie string into an array of individual cookies
    // Find the cookie with the name 'token' and extract its value
    const tokenCookie = cookieArray.find((cookie) =>
      cookie.trim().startsWith('token=')
    );

    // console.log('token', tokenCookie);
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      // console.log('token', jwtDecode(token));
      const { username, email, role, picture } = jwtDecode(token);
      setUserInfo({
        email: email,
        role: role,
        username: username,
        picture: picture,
      });
      setTokenAuth(token);
      setIsAuthenticated(true);

      navigate('/');
    } else {
      setIsAuthenticated(false);

      navigate('/login');
    }
  }, []);

  useEffect(() => {
    console.log('googleauth', googleAuth);
    success();
  }, []);

  return (
    <>
      <MyProSidebarProvider>
        {googleAuth && contextHolder}
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
