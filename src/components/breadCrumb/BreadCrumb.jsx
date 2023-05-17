import React, { useContext } from 'react';
import './breadCrumb.css';
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';
import { useMediaQuery } from '@mui/material';
const breadcrumbNameMap = {
  '/manageTeam': 'Team',
  '/manageDevice': 'Devices',
};

const BreadCrumb = () => {
  const { userInfo } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <NavLink to={url}>{breadcrumbNameMap[url]}</NavLink>,
    };
  });
  const breadcrumbItems = [
    {
      title: <NavLink to="/">Dashboard</NavLink>,
      key: 'Dashboard',
    },
  ];

  const isNonMobile = useMediaQuery('(min-width:760px)');
  return (
    <div className="breadcrumb">
      {!isNonMobile && (
        <div className="breadcrumb-nav">
          <NavLink style={{ color: colors.greenAccent[500] }} to="/">
            Dashboard
          </NavLink>
          <NavLink style={{ color: colors.greenAccent[500] }} to="/profil">
            Profil
          </NavLink>
          <NavLink style={{ color: colors.greenAccent[500] }} to="/FAQ">
            FAQ
          </NavLink>
          {userInfo.role === 'admin' ? (
            <>
              <NavLink
                style={{ color: colors.greenAccent[500] }}
                to="/manageTeam"
              >
                Team
              </NavLink>
              <NavLink
                style={{ color: colors.greenAccent[500] }}
                to="/manageDevice"
              >
                Devices
              </NavLink>
              <NavLink
                style={{ color: colors.greenAccent[500] }}
                to="/form/user"
              >
                New User
              </NavLink>
            </>
          ) : null}
        </div>
      )}
      {/* <Routes>
        <Route path="/" element={<span>Dashboard</span>} />
        <Route path="/profil" element={<span>Profil</span>} />
        <Route path="/FAQ" element={<span>FAQ</span>} />
        {userInfo.role === 'admin' ? (
          <>
            <Route path="/manageTeam" element={<span>Team</span>} />
            <Route path="/manageDevice" element={<span>Devices</span>} />
            <Route path="/form/user" element={<span>New User</span>} />
          </>
        ) : null}
        <Route path="/profil" element={<span>Profil</span>} />
      </Routes> */}
      {/* <Breadcrumb items={breadcrumbItems} /> */}
    </div>
  );
};

export default BreadCrumb;
