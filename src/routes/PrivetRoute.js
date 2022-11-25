import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!currentUser?.uid) {
    return (
      <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivetRoute;
