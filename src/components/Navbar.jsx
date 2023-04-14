import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   isAuthenticated && navigate('/');
  //   console.log('navbar', isAuthenticated);
  // }, []);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          IOT Dashboard
        </Link>
      </span>
      {true ? (
        <ul className="list">
          <li className="listItem">
            {/* <img
              src={
                user
                  ? user.picture
                  : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
              }
              alt="profil_pic"
              className="avatar"
            /> */}
          </li>
          <li className="listItem">username</li>
          <li className="listItem" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
