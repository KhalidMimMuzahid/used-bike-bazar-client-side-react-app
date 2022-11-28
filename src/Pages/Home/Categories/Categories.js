import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { currentUser } = useState(AuthContext);
  useEffect(() => {
    fetch("https://used-bike-bazar-server.vercel.app/catetories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const navigate = useNavigate();
  const handleCategory = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };
  console.log("categories", categories);
  if (categories.length === 0) {
    return;
  }
  return (
    <>
      {currentUser?.uid && (
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
