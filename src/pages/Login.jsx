import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from '../services/axiosInterceptor';
import jwtDecode from 'jwt-decode';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import google from '../img/google.png';
import { UserContext } from '../context/UserContextProvider';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, login, checkAuthentication } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post('/api/auth/users/login', input, {
        widthCredentials: true,
      })
      .then((response) => {
        alert(response.data.message);
        login(response.data.token, response.data.username);

        console.log('COOKIES', Cookies.get('token'));
        const token = Cookies.get('token');

        if (token) {
          console.log('token login is set', isAuthenticated);
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            setIsAuthenticated(false);
            Cookies.remove('token');
            return navigate('/login');
          } else {
            setIsAuthenticated(true);
            return navigate('/');
          }
        } else {
          setIsAuthenticated(false);
          return navigate('/');
        }
      })
      .catch((error) => {
        console.log('message error : ', error);
        alert(error);
      });
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  useEffect(() => {
    checkAuthentication();
    console.log('login usercontext', isAuthenticated);
  }, []);

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
