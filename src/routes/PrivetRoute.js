import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Component/Loader/Loader";
import { AuthContext } from "../Context/AuthProvider";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, isLoading } = useContext(AuthContext);
  console.log("isLoading privet", isLoading);
  if (isLoading) {
    return <Loader />;
  }
  if (!currentUser?.uid) {
    return (
      <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivetRoute;
