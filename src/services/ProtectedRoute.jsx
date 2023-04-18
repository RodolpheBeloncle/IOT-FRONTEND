import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
import SideMenuBar from "../components/nav/SideMenuBar";
import Topbar from "../components/nav/Topbar";

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuthentication } = useContext(UserContext);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <>
      <div className="app">
        <SideMenuBar />
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Navbar />
            <BreadCrumb />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
