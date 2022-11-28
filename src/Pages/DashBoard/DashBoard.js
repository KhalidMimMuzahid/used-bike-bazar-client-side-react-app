import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import { AuthContext } from "../../Context/AuthProvider";
import useRole from "../../hooks/useRole/useRole";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);
  const [role, roleLoading] = useRole(currentUser?.uid);
  if (roleLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className=" drawer-content flex flex-col items-center ">
        {/* Page content here  */}
        <Outlet />
      </div>
      <div className="drawer-side border-r-4">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here  */}
          {/* buyer can see this  */}
          {role === "buyer" && (
            <>
              <li>
                <Link to="/dashboard/myorders">My orders</Link>
              </li>
            </>
          )}

          {/* seller can see this  */}
          {role === "seller" && (
            <>
              <li>
                <Link to="/dashboard/addproduct">Add A product</Link>
              </li>
              <li>
                <Link to="/dashboard/myproducts">My Products</Link>
              </li>
              {/* <li>
                <Link to="/dashboard/soldproducts">
                  sold Products(optional)
                </Link>
              </li> */}
              {/* my buyers is optional */}
              <li>
                <Link to="/dashboard/mybuyers">My buyers</Link>
              </li>
            </>
          )}

          {/* only admin can see this  */}
          {role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/allsellers">All Sellers</Link>
              </li>
              <li>
                <Link to="/dashboard/allbuyers">All Buyers</Link>
              </li>
              <li>
                <Link to="/dashboard/reporteditems">Reported Items</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
