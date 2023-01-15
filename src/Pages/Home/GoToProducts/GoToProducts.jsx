import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useRole from "../../../hooks/useRole/useRole";
import apriliaRSV4 from "../../../Assets/Images/apriliaRSV4.webp";
const GoToProducts = () => {
  const { currentUser } = useContext(AuthContext);
  const [role, roleLoading, roleLoadingForUnSigned] = useRole(currentUser?.uid);
  return (
    <>
      {(!currentUser?.uid || role === "buyer") && (
        <div
          className="hero min-h-full "
          style={{
            backgroundImage: `url("https://i.ibb.co/xmVK2jW/aprilia-RSV4.webp")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60 py-72"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold">
                Hello there,
                <br /> you favorite bike is here
              </h1>
              <p className="mb-5">
                It is the most wanted site that always import best bikes with
                the best price. For each and every bike, we check this quality
                first and then we stock this bike.
              </p>
              <Link to="/products/all" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoToProducts;
