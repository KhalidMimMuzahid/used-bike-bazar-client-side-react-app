import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AddProducts from "../Pages/DashBoard/AddProducts/AddProducts";
import AllBuyers from "../Pages/DashBoard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/DashBoard/AllSellers/AllSellers";
import DashBoard from "../Pages/DashBoard/DashBoard";
import MyBuyers from "../Pages/DashBoard/MyBuyers/MyBuyers";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import ReportedItems from "../Pages/DashBoard/ReportedItems/ReportedItems";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivetRoute from "./PrivetRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivetRoute>
            <DashBoard />
          </PrivetRoute>
        ),
        children: [
          {
            path: "/dashboard/myorders",
            element: (
              <BuyerRoute>
                <MyOrders />
              </BuyerRoute>
            ),
          },
          {
            path: "/dashboard/addproduct",
            element: (
              <SellerRoute>
                <AddProducts />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/myproducts",
            element: (
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/mybuyers",
            element: (
              <SellerRoute>
                <MyBuyers />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/allsellers",
            element: (
              <AdminRoute>
                <AllSellers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/allbuyers",
            element: (
              <AdminRoute>
                <AllBuyers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/reporteditems",
            element: (
              <AdminRoute>
                <ReportedItems />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);
