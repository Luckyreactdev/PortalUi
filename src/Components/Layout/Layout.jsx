import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const location = useLocation();

  // const check = useSelector(selectIsAuthenticated);

  if (location.pathname === "/") {
    return children;
  }

  return <Sidebar>{children}</Sidebar>;
};

export default Layout;
