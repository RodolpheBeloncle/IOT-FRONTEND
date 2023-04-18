import React, { useState, useEffect, useContext } from "react";
import "./app.css";
// import BreadCrumb from './components/BreadCrumb';
// import Navbar from './components/Navbar';
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Devices from "./pages/Devices";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";
import Profil from "./pages/Profil";
import ProtectedRoute from "./services/ProtectedRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

// == TEST IMPLEMENT ==

import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";

// == ======================

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GoogleOAuthProvider clientId="43002333952-1r210l702o69enm56gb1nh33l27guvhf.apps.googleusercontent.com">
            <ProSidebarProvider>
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
            </ProSidebarProvider>
          </GoogleOAuthProvider>
          ;
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
