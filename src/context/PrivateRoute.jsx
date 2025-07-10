import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;
