import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
// import axios from '../Services/axiosInterceptor';
const Profil = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  // !!  === TODO setname in cookie too   ===

  const [input, setInput] = useState({
    newpassword: '',
    confirmpassword: '',
    username: userInfo.username,
  });

  const handleLogout = () => {
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';

    document.cookie =
      'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
    navigate('/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const response = await axios
      .post('http://localhost:5000/api/auth/change-password', input, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        handleLogout();
      })
      .catch((error) => {
        alert(error);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/`)
  //     .then((res) => {
  //       console.log('GOOGLE AUTH', res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <section class="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderRadius: '1rem' }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    class="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <h1 className="h1 text-center">Profil Page</h1>
                    <form onSubmit={handleChangePassword}>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <h2>Welcome</h2>
                        <span class="h3 fw-bold mb-0 mx-3">
                          {userInfo.username}
                        </span>
                        <button
                          onClick={handleLogout}
                          className="btn btn-primary"
                        >
                          Logout
                        </button>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: '1px' }}
                      >
                        Change your Password
                      </h5>

                      <div class="form-outline mb-4">
                        <input
                          placeholder="Enter New Password"
                          name="newpassword"
                          type="password"
                          class="form-control form-control-lg"
                          value={input.newpassword}
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
                          placeholder="Confirm Your Password"
                          type="password"
                          name="confirmpassword"
                          class="form-control form-control-lg"
                          value={input.confirmpassword}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div class="pt-1 mb-4">
                        <button
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profil;
