import React, { useState } from 'react';
import './app.css';
// import BreadCrumb from './components/BreadCrumb';
// import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';
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
import { UserContextProvider } from './context/UserContextProvider';
const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ForgetPassword />} />
                <Route
                  path="/user/reset/:id/:token"
                  element={<ChangePassword />}
                />
                <Route
                  path="/home"
                  element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
                ></Route>
                <Route path="/" element={<Devices />} />
                <Route path="/profil" element={<Profil />} />
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
