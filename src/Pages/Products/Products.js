import React from "react";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here  */}
        <Outlet />
      </div>
      <div className="drawer-side border-r-4">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80  text-base-content">
          <li>
            <Link to="">eachcategory</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Products;
