import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
// import axios from '../Services/axiosInterceptor';
const Profil = () => {
  const { userInfo, getCookie, clearCookie } = useContext(UserContext);
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
    clearCookie('token');
    clearCookie('googleAuth');
    navigate('/login');
  };

  const handleChangeProfil = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // !! handle password if googleauth width changpassword component , check email,notification message,popuupwindow validation
    // !! change profil picture
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const token = getCookie('token');
    await axios
      .post(import.meta.env.VITE_API_CHANGE_PROFIL, input, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        // handleLogout();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <img
              src={
                userInfo.picture
                  ? userInfo.picture
                  : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
              }
              alt="profil_pic"
              className="img-fluid"
              style={{ borderRadius: '1rem 0 0 1rem' }}
            />
          </div>
          <div class="col-md-8">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="username">Update Username</label>

                <input
                  type="text"
                  value={input.username}
                  onChange={handleChangeProfil}
                  className="form-control"
                  id="username"
                  placeholder="username"
                />
              </div>
              <div class="form-group">
                <label for="password">Update Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={handleChangeProfil}
                />
              </div>
              <div class="form-group">
                <label>
                  Confirm Password:
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm password"
                    value={input.confirmpassword}
                    onChange={handleChangeProfil}
                  />
                </label>
              </div>
              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
    //   <div className="container py-5 h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col col-xl-10">
    //         <div className="card" style={{ borderRadius: '1rem' }}>
    //           <div className="row g-0">
    //             <div className="col-md-6 col-lg-5 d-none d-md-block">
    //               <img
    //                 src={
    //                   userInfo.picture
    //                     ? userInfo.picture
    //                     : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
    //                 }
    //                 alt="profil_pic"
    //                 className="img-fluid"
    //                 style={{ borderRadius: '1rem 0 0 1rem' }}
    //               />
    //             </div>
    //             <div className="col-md-6 col-lg-7 d-flex align-items-center">
    //               <div className="card-body p-4 p-lg-5 text-black">
    //                 <h1 className="h1 text-center">Profil Page</h1>
    //                 <form onSubmit={handleChangeProfil}>
    //                   <div className="d-flex align-items-center mb-3 pb-1">
    //                     <h2>Welcome</h2>
    //                     <span className="h3 fw-bold mb-0 mx-3">
    //                       {userInfo.username}
    //                     </span>
    //                     <button
    //                       onClick={handleLogout}
    //                       className="btn btn-primary"
    //                     >
    //                       Logout
    //                     </button>
    //                   </div>

    //                   <h5
    //                     className="fw-normal mb-3 pb-3"
    //                     style={{ letterSpacing: '1px' }}
    //                   >
    //                     Change your Password
    //                   </h5>

    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Enter New Password"
    //                       name="newpassword"
    //                       type="password"
    //                       className="form-control form-control-lg"
    //                       value={input.newpassword}
    //                       onChange={(e) =>
    //                         setInput({
    //                           ...input,
    //                           [e.target.name]: e.target.value,
    //                         })
    //                       }
    //                     />
    //                   </div>

    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Confirm Your Password"
    //                       type="password"
    //                       name="confirmpassword"
    //                       className="form-control form-control-lg"
    //                       value={input.confirmpassword}
    //                       onChange={(e) =>
    //                         setInput({
    //                           ...input,
    //                           [e.target.name]: e.target.value,
    //                         })
    //                       }
    //                     />
    //                   </div>

    //                   <div className="pt-1 mb-4">
    //                     <button
    //                       className="btn btn-dark btn-lg btn-block"
    //                       type="submit"
    //                     >
    //                       Change Password
    //                     </button>
    //                   </div>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Profil;
