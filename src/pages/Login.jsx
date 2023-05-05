import React, { useState, useContext } from 'react';
import './styles/login.css';
import { ReactComponent as IotLogo } from '../img/iot_logo.svg';
import { Space, Spin, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Login = () => {
  const { setIsAuthenticated, getCookie, setCookie } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
    timeout: 2000,
  });

  // let googleAuth = getCookie('googleAuth');
  // let tokencookie = getCookie('token');
  // console.log('googleAuth', googleAuth);
  // console.log('cookietoken', tokencookie);

  //!! fix call api for all query and set crud from mongo + .env
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const { response } = await axios.post(
  //       'http://localhost:5000/api/auth/users/login',
  //       input
  //     );

  //     // if (!response.data.token) {
  //     //   setIsAuthenticated(false);
  //     //   setIsLoading(false);
  //     //   alert(response.data);
  //     //   navigate('/login');
  //     // }

  //     console.log('token from userlogin', response.token);
  //     console.log('responsedatamessage', response.message);
  //     await setCookie('token', response.token);
  //     setIsAuthenticated(true);
  //     setIsLoading(false);
  //     alert(response.message);

  //     navigate('/');
  //   } catch ({ response }) {
  //     if (response) {
  //       const { data } = response;
  //       setIsLoading(false);
  //       console.log('error', data);
  //       alert(data);
  //     }
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:5000/api/auth/users/login',
  //       loginCredentials
  //     );
  //     const { message, token } = response.data;

  //     await setCookie('token', token);
  //     setIsAuthenticated(true);
  //     alert(message);

  //     navigate('/');
  //   } catch (error) {
  //     if (error.response) {
  //       const { data } = error.response;
  //       alert(data);
  //     } else {
  //       alert('An unexpected error occurred');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ? ==== login json_server ====
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await instance.post(
        import.meta.env.VITE_API_JSONAUTH_LOGIN,
        loginCredentials
      );
      console.log('register : ', response.data.accessToken);
      setCookie('token', response.data.accessToken);
      alert(response.statusText);
      setIsAuthenticated(true);

      navigate('/');
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        alert(data);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  //  ? ==== TEST getdeviceswidth auth ====
  // const getUser = async () => {
  //   console.log('token', getCookie('token'));
  //   axios
  //     .get(import.meta.env.VITE_API_AUTH_DEVICES, {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${getCookie('token')}`,
  //       },
  //     })
  //     .then((res) => res)
  //     .then((data) => console.log(data));
  // };
  // getUser();

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
      {/* <h1 className="loginTitle">Choose a Login Method</h1> */}
      <div className="wrapper">
        <div className="left">
          {/* <div classNameName="loginButton google" onClick={googleLogin}>
            <img src={google} alt="" classNameName="icon" />
          </div> */}

          <div className="google-btn" onClick={googleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
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
            {/* <div className="d-flex align-items-center mb-3 pb-1">
              <IotLogo />
              <i
                className="fas fa-cubes fa-2x me-3"
                style={{ color: ' #ff6219' }}
              ></i>
              <span className="h1 fw-bold mb-0">
                <IotLogo />
              </span> 
            </div>
             <h5
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: '1px' }}
            >
              Sign into your account
             </h5>
             <div className="form-outline mb-4">
              <input
                type="email"
                id=""
                placeholder="Enter Email"
                className="form-control form-control-lg"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
              />
             </div>
             <div className="form-outline mb-4">
              <input
                placeholder="Enter Password"
                type="password"
                id="form2Example27"
                className="form-control form-control-lg"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
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
                className="btn btn-dark btn-lg btn-block login-btn"
                style={{
                  background: '#3ee09a',
                  border: 'solid 1px #fff',
                }}
                type="submit"
              >
                Login
              </button>
            </div> */}

            <div className="form-outline mb-4">
              <input
                className="form-control form-control-lg"
                type="email"
                value={loginCredentials.email}
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
