import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:5000/auth/logout');
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
            <img
              src={
                user
                  ? user.picture
                  : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
              }
              alt="profil_pic"
              className="avatar"
            />
          </li>
          <li className="listItem">username</li>
          <li className="listItem" onClick={logout}>
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
