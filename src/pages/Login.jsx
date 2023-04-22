import React, { useEffect, useState, useContext } from 'react';
import { Space, Spin } from 'antd';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import google from '../img/google.png';
import { UserContext } from '../context/UserContextProvider';

const Login = () => {
  const { setIsAuthenticated, login, tokenAuth, setTokenAuth,setCookie } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/users/login', input, {
        widthCredentials: true,
      });
      alert(response.data.message);
      console.log('token from userlogin', response.data.token);
      // login(response.data.token, response.data.username);

      if (!response.data.token) {
        setIsAuthenticated(false);
        navigate('/login');
      }

      const decodedToken = jwtDecode(response.data.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setIsAuthenticated(false);
        // Cookies.remove('token');
        navigate('/login');
      }

      setCookie('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.log('message error : ', error);
      alert(error);
    }
  };

  const handleGoogleLogin = async () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div className="login">
      <div class="video-wrapper">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
      </div>
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={handleGoogleLogin}>
            <img src={google} alt="" className="icon" />
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
          {/* <GoogleLogin
            clientId="43002333952-1r210l702o69enm56gb1nh33l27guvhf.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            fetchBasicProfile={true}
          /> */}
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form onSubmit={handleLogin}>
            <div class="d-flex align-items-center mb-3 pb-1">
              <i
                class="fas fa-cubes fa-2x me-3"
                style={{ color: ' #ff6219' }}
              ></i>
              <span class="h1 fw-bold mb-0">Logo</span>
            </div>
            <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
              Sign into your account
            </h5>
            <div class="form-outline mb-4">
              <input
                type="email"
                id=""
                placeholder="Enter Email"
                class="form-control form-control-lg"
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
            <div class="form-outline mb-4">
              <input
                placeholder="Enter Password"
                type="password"
                id="form2Example27"
                class="form-control form-control-lg"
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
            <div class="pt-1 mb-4">
              <button class="btn btn-dark btn-lg btn-block" type="submit">
                Login
              </button>
            </div>
            Forget Password ?<Link to={'/reset-password'}>Click Here</Link>
            <p class="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#393f81' }}>
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
