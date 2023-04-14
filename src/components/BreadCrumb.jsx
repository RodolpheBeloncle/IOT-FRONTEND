import React from 'react';
import { Alert, Breadcrumb, Row } from 'antd';
import '../components/styles/breadCrumb.css';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  // '/apps': 'Application List',
  // '/apps/1': 'Application1',
  // '/apps/2': 'Application2',
  // '/apps/1/detail': 'Detail',
  // '/apps/2/detail': 'Detail',
  '/manage': 'Manage',
  '/manage/profil': 'Profil',
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
  ].concat(extraBreadcrumbItems);
  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/manage">Manage</Link>
        <Link to="/manage/profil">Profil</Link>
      </div>
      <Routes>
        <Route path="*" element={<span>Dashboard</span>} />
        <Route path="/manage" element={<span>Manage</span>} />
        <Route path="/profil" element={<span>Profil</span>} />
      </Routes>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default BreadCrumb;
