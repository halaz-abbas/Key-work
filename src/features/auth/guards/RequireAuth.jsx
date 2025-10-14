import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />;
  }

  return children;
};

export default RequireAuth;
