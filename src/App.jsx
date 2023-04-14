import React, { useState, useEffect, useContext } from 'react';
import './app.css';
// import BreadCrumb from './components/BreadCrumb';
// import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Devices from './pages/Devices';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import Profil from './pages/Profil';
import ProtectedRoute from './services/ProtectedRoute';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ForgetPassword />} />
              <Route
                path="/user/reset/:id/:token"
                element={<ChangePassword />}
              />

              <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<Devices />} />
              </Route>

              <Route path="/profil" element={<Profil />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
