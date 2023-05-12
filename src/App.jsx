import React, { useContext } from 'react';
import './app.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';
import Login from './pages/Login';
import Devices from './pages/Devices';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import Profil from './pages/Profil';
import Team from './pages/team/Team';
import ControllersIoT from './pages/controllersiot/ControllersIoT';
import FormUser from './pages/form/FormUser';
import NotFound from './pages/notFound/NotFound';
import { UserContext } from './context/UserContextProvider';
import FAQ from './pages/faq/Faq';

const App = () => {
  const [theme, colorMode] = useMode();
  const { isAuthenticated } = useContext(UserContext);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/login/:token" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset-password" element={<ForgetPassword />} />
            <Route
              exact
              path="/user/reset/:id/:token"
              element={<ChangePassword />}
            />

            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route element={<Devices />} path="/" exact />
              <Route exact path="/profil" element={<Profil />} />
              <Route exact path="form/user">
                <Route exact index element={<FormUser />} />
                <Route exact path=":id" element={<FormUser />} />
              </Route>
              <Route exact path="/manageTeam" element={<Team />} />
              <Route exact path="/manageDevice" element={<ControllersIoT />} />
              <Route exact path="/faq" element={<FAQ />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
