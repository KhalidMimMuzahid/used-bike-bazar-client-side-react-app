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
        element: <DashBoard />,
        children: [
          {
            path: "/dashboard/myorders",
            element: <MyOrders />,
          },
          {
            path: "/dashboard/addproduct",
            element: <AddProducts />,
          },
          {
            path: "/dashboard/myproducts",
            element: <MyProducts />,
          },
          {
            path: "/dashboard/mybuyers",
            element: <MyBuyers />,
          },
          {
            path: "/dashboard/allsellers",
            element: <AllSellers />,
          },
          {
            path: "/dashboard/allbuyers",
            element: <AllBuyers />,
          },
          {
            path: "/dashboard/reporteditems",
            element: <ReportedItems />,
          },
        ],
      },
    ],
  },
]);
