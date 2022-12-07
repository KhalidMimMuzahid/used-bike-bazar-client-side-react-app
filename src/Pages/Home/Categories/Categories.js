import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useRole from "../../../hooks/useRole/useRole";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [role, roleLoading, roleLoadingForUnSigned] = useRole(currentUser?.uid);

  useEffect(() => {
    fetch("https://used-bike-bazar-server.vercel.app/catetories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const navigate = useNavigate();
  const handleCategory = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };
  // console.log("categories", categories);
  // console.log("current user", currentUser);
  if (categories.length === 0 || !currentUser?.uid || roleLoadingForUnSigned) {
    return;
  }
  // (role === "buyer" || role == null)
  return (
    <>
      {currentUser?.uid && role === "buyer" && (
        <div>
          <h1 className="font-bold text-2xl my-4">select your category</h1>
          {categories.map((category) => (
            <button
              onClick={() => handleCategory(category?.categoryName)}
              className="btn btn-xl m-2 "
            >
              {category?.categoryName}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;
