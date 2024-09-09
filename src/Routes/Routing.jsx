import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Portalsetup from "../Components/Portal/Portal-Setup/Portalsetup.jsx";
import Login from "../components/Login/Login.jsx";
import Layout from "../Components/Layout/Layout.jsx";
import { useSelector } from "react-redux";
import NavigationTabs from "../Components/Portal/Tabs/Tabs.jsx";

const Routing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/PortalSetup"
          element={isAuthenticated ? <NavigationTabs /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
