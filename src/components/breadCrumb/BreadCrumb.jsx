import React from 'react';
import { Alert, Breadcrumb, Row } from 'antd';
import './breadCrumb.css';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/manageTeam': 'Team',
  '/manageDevice': 'Devices',
};

const BreadCrumb = () => {
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
  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/manageTeam">Team</Link>
        <Link to="/manageDevice">Devices</Link>
      </div>
      <Routes>
        <Route path="/" element={<span>Dashboard</span>} />
        <Route path="/manageTeam" element={<span>Team</span>} />
        <Route path="/manageDevice" element={<span>Devices</span>} />
        <Route path="/profil" element={<span>Profil</span>} />
      </Routes>
      {/* <Breadcrumb items={breadcrumbItems} /> */}
    </div>
  );
};

export default BreadCrumb;
