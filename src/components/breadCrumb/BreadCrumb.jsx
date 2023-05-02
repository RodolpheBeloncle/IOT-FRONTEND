import React, { useContext } from 'react';
import { Alert, Breadcrumb, Row } from 'antd';
import './breadCrumb.css';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';
import { useMediaQuery } from '@mui/material';
const breadcrumbNameMap = {
  '/manageTeam': 'Team',
  '/manageDevice': 'Devices',
};

const BreadCrumb = () => {
  const { userInfo } = useContext(UserContext);
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
      key: 'Dashboard',
    },
  ];

  const isNonMobile = useMediaQuery('(min-width:760px)');
  return (
    <div className="demo">
      {!isNonMobile && (
        <div className="demo-nav">
          <Link to="/">Dashboard</Link>
          {userInfo.role === 'Admin' ? (
            <>
              <Link to="/manageTeam">Team</Link>
              <Link to="/manageDevice">Devices</Link>
              <Link to="/form/user">New User</Link>
            </>
          ) : null}
        </div>
      )}
      <Routes>
        <Route path="/" element={<span>Dashboard</span>} />
        {userInfo.role === 'Admin' ? (
          <>
            <Route path="/manageTeam" element={<span>Team</span>} />
            <Route path="/manageDevice" element={<span>Devices</span>} />
            <Route path="/form/user" element={<span>New User</span>} />
          </>
        ) : null}
        <Route path="/profil" element={<span>Profil</span>} />
      </Routes>
      {/* <Breadcrumb items={breadcrumbItems} /> */}
    </div>
  );
};

export default BreadCrumb;
