import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Navbar = () => {
  const { handleLogout, userInfo } = useContext(UserContext);

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          IOT Dashboard
        </Link>
      </span>
      {true ? (
        <ul className="list">
      
          <li className="listItem">{userInfo.username}</li>
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
