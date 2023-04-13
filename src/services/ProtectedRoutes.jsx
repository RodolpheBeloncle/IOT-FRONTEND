import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import Profil from '../pages/Profil';
import axios from './axiosInterceptor';
const ProtectedRoutes = () => {
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return <p>protected router</p>;
};

export default ProtectedRoutes;
