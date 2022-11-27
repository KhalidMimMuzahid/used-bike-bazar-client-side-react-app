import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/catetories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const navigate = useNavigate();
  const handleCategory = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };

  return (
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
  );
};

export default Categories;
