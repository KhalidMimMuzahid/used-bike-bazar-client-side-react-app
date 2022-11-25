import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../hooks/useRole/useRole";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isLoading, logOut } = useContext(AuthContext);
  const [role, roleLoading] = useRole(currentUser?.uid);
  console.log(role);
  if (isLoading || roleLoading) {
    return <h1>Loading...</h1>;
  }
  if (currentUser?.uid && role === "admin") {
    return children;
  }
  logOut()
    .then(() => {
      localStorage.removeItem("accessToken");
    })
    .catch((error) => {
      console.log(error);
    });
  return navigate("/signin");
};

export default AdminRoute;
