import React, { useState, useContext } from 'react';
import './styles/login.css';
import { ReactComponent as IotLogo } from '../img/iot_logo.svg';
import { Space, Spin, message } from 'antd';
import axios from '../services/axiosInterceptor';

// import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import google from '../img/google.png';
import { UserContext } from '../context/UserContextProvider';

const Login = () => {
  const { setIsAuthenticated, getCookie, setCookie, clearCookie } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  let googleAuth = getCookie('googleAuth');
  let tokencookie = getCookie('token');
  console.log('googleAuth', googleAuth);
  console.log('cookietoken', tokencookie);

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { response } = await axios.post('/api/auth/users/login', input, {
        widthCredentials: true,
      });

      if (!response.data.token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        message.error(response.data, 2);
        navigate('/login');
      }

      const decodedToken = jwtDecode(response.data.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setIsAuthenticated(false);
        clearCookie('token');
        setIsLoading(false);
        alert(response.data.message);
        navigate('/login');
      }

      console.log('token from userlogin', response.data.token);
      console.log('responsedatamessage', response.data.message);
      alert(response.data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
      setCookie('token', response.data.token);
      navigate('/');
    } catch ({ response }) {
      setIsLoading(false);
      console.log('error', response.data);
      message.error(response.data, 2);
      message.info("Don't have an account? click on link below", 2);
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
            <div className="d-flex align-items-center mb-3 pb-1">
              <IotLogo />
              <i
                className="fas fa-cubes fa-2x me-3"
                style={{ color: ' #ff6219' }}
              ></i>
              {/* <span className="h1 fw-bold mb-0">
                <IotLogo />
              </span> */}
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
                className="btn btn-dark btn-lg btn-block"
                style={{
                  background: '#3ee09a',
                  border: 'solid 1px #fff',
                }}
                type="submit"
              >
                Login
              </button>
            </div>

            <p
              className="mb-5 pb-lg-2"
              style={{ color: '#fff', fontWeight: 'bolder' }}
            >
              Forget Password ?<Link to={'/reset-password'}>Click Here</Link>
            </p>
            <p
              className="mb-5 pb-lg-2"
              style={{ color: '#fff', fontWeight: 'bolder' }}
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{ color: '#0d6efd', fontWeight: 'bolder' }}
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
