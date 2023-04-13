import React, { useEffect, useState } from 'react';
import BreadCrumb from './components/BreadCrumb';
import axios from './services/axiosInterceptor';
import './app.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Devices from './pages/Devices';
import Register from './components/Register';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import Profil from './pages/Profil';
import ProtectedRoutes from './services/ProtectedRoutes';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <BreadCrumb />
        <Routes>
          <Route path="/" element={<Devices />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/user/reset/:id/:token" element={<ChangePassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/profil" element={<Profil />} />
          </Route> */}
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
