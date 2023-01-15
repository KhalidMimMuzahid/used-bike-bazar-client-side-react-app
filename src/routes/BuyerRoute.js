import { info } from "daisyui/src/colors";
import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Component/Loader/Loader";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../hooks/useRole/useRole";

const BuyerRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const { currentUser, isLoading, setIsLoading, logOut } =
    useContext(AuthContext);

  console.log(
    "---------------------------------------------------------------------"
  );
  console.log("currentUser?.uid buyer route ==", currentUser?.uid);
  const [role, roleLoading, roleLoadingForUnSigned] = useRole(currentUser?.uid);
  console.log("role buyer route ==", role);
  console.log("roleLoading buyer route ==", roleLoading);
  console.log("isLoading buyer route ==", isLoading);
  console.log(
    "---------------------------------------------------------------------"
  );
  if (isLoading) {
    return <Loader />;
  }
  // if (roleLoadingForUnSigned) {
  //   return <h1>role loading</h1>;
  // }
  // state={{ from: location }} replace
  if (!currentUser?.uid) {
    return <Navigate to="/signin"></Navigate>;
  }
  if (roleLoading) {
    return;
  }

  if (currentUser?.uid && role === "buyer") {
    return children;
  }

  if (currentUser?.uid) {
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error);
      });
  }

  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
