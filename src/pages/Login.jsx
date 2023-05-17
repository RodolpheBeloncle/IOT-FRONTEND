import React, { useState, useContext } from 'react';
import './styles/login.css';
import { ReactComponent as IotLogo } from '../img/iot_logo.svg';
import { Space, Spin, notification, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Login = () => {
  const { setIsAuthenticated, getCookie, setCookie, isLoading, setIsLoading } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_AUTH_LOGIN,
        loginCredentials
      );

      const { message, token } = response.data;

      await setCookie('token', token);
      setIsAuthenticated(true);

   
      notification.success({
        message: 'Login Successful',
        description: message,
        placement: 'bottomRight',
      });

      navigate('/');
    } catch (error) {
      notification.error({
        message: 'error',
        description: error.response.data,
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const googleLogin = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'google login process..',
        duration: 2.5,
      })
      .then(() => handleGoogleLogin());
  };

  return (
    <div className="login">
      <div className="video-wrapper">
        <video
          src="https://cdn.dribbble.com/userupload/6114976/file/original-2f26522549d6167c4d3223c384fce5f4.mp4"
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
      </div>
      {contextHolder}

      <div className="wrapper">
        {/* <IotLogo /> */}
        <div className="left">
          <IotLogo />
          {/* <div className="google-btn" onClick={googleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div> */}
          <div className="google-btn" onClick={googleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Icon"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with Google</b>
            </p>
          </div>
          {isLoading && (
            <Space
              direction="vertical"
              style={{
                width: '100%',
              }}
            >
              <Spin tip="Loading" size="small">
                <div className="content" />
              </Spin>
            </Space>
          )}
        </div>

        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <input
                className="form-control form-control-lg"
                type="email"
                value={loginCredentials.email}
                placeholder="Enter Email"
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-outline mb-4">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Enter Password"
                value={loginCredentials.password}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div
              className="pt-1 mb-4"
              style={{
                fontWeight: 'bolder',
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-dark btn-lg btn-block login-btn"
                style={{
                  background: '#3ee09a',
                  border: 'solid 1px #fff',
                  width: '100%',
                }}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <p
            className="mb-5 pb-lg-2"
            style={{ color: '#fff', fontWeight: 'bolder' }}
          >
            Forget Password ?
            <Link
              style={{ color: '#3ee09a', fontWeight: 'bolder' }}
              to={'/reset-password'}
            >
              Click Here
            </Link>
          </p>
          <p
            className="mb-5 pb-lg-2"
            style={{ color: '#fff', fontWeight: 'bolder' }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{ color: '#3ee09a', fontWeight: 'bolder' }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
