import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import google from '../img/google.png';
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios
      .post('/api/auth/users/login', input, {
        widthCredentials: true,
      })
      .then((response) => {
        alert(response.data.message);
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('username', response.data.username);
        console.log('COOKIES', Cookies.get('token'));
        navigate('/');
      })
      .catch((error) => {
        console.log('message error', error);
        alert(error.response.data.message);
      });
  };

  const handleGoogleLogin = () => {
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
