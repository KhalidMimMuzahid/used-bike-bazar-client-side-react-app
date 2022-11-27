import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";

const Products = () => {
  const productCategories = useLoaderData();

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const productCategory = e.target.value;
    // setProductCategory(productCategory);
    navigate(`/products/${productCategory}`);
  };
  return (
    <div className="drawer drawer-mobile ">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here  */}
        <Outlet />
      </div>
      <div className="drawer-side border-r-4">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <form className="pr-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">select Bike brand</span>
            </label>
            <select
              onChange={handleCategoryChange}
              name="productCategory"
              defaultValue="all"
              className="select select-bordered select-sm"
              style={{ backgroundColor: "transparent" }}
            >
              <option disabled selected>
                Pick one
              </option>
              <option value="all">all</option>
              {productCategories.map((eachCategory) => (
                <option
                  key={eachCategory?.categoryId}
                  value={eachCategory?.categoryName}
                >
                  {eachCategory?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">select Bike Category</span>
            </label>
            <select
              className="select select-bordered select-sm "
              style={{ backgroundColor: "transparent" }}
            >
              <option disabled selected>
                Pick one
              </option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Products;
