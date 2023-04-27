import React from 'react';
import './app.css';
import UserContextProvider from './context/UserContextProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';
import Login from './pages/Login';
import Devices from './pages/Devices';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import Profil from './pages/Profil';
import Dashboard from './pages/dashboard/Dashboard';
import Team from './pages/team/Team';
import ControllersIoT from './pages/controllersiot/ControllersIoT';
import FormUser from './pages/formUser/FormUser';
import FAQ from './pages/faq/Faq';

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <BrowserRouter>
            <UserContextProvider>
              <Routes>
                <Route path="/login/" element={<Login />} />
                <Route path="/login/:token" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ForgetPassword />} />
                <Route
                  path="/user/reset/:id/:token"
                  element={<ChangePassword />}
                />
                {/* <Route path="/" element={<ProtectedRoute />}>
                  <Route index element={<Devices />} />
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/form" element={<FormUser />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/manageTeam" element={<Team />} />
                  <Route path="/manageDevice" element={<ControllersIoT />} />
                  <Route path="/faq" element={<FAQ />} />
                </Route> */}
                <Route index element={<Devices />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/form" element={<FormUser />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manageTeam" element={<Team />} />
                <Route path="/manageDevice" element={<ControllersIoT />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </UserContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
