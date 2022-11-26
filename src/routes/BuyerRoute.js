import { info } from "daisyui/src/colors";
import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../hooks/useRole/useRole";

const BuyerRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isLoading, logOut } = useContext(AuthContext);
  const [role, roleLoading] = useRole(currentUser?.uid);
  console.log(role);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (roleLoading) {
    return;
  }
  if (currentUser?.uid && role === "buyer") {
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

export default BuyerRoute;
