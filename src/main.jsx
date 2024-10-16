import ReactDOM from "react-dom/client";
import React from "react";
import RootLayout from "./layouts/RootLayout.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import UserList from "./screens/user/UserList.jsx";
import { SnackbarProvider } from "./components/context/CustomSnackbarContext.jsx";
import ProductList from "./screens/products/ProductList.jsx";
import MyProductScreen from "./screens/MyProductScreen.jsx";
import Orders from "./screens/vendor/orders";
import Reviews from "./screens/vendor/Reviews";
import CustomerList from "./screens/user/CusomerList.jsx";
import AllOrders from "./screens/csr/AllOrders.jsx";
import ToCancell from "./screens/csr/ToCancell.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CategoryList from "./screens/products/CategoryList.jsx";
import SubCategoryList from "./screens/products/SubCategoryList.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/reset",
        element: <ResetPassword />,
      },
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <DashboardScreen />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "categories",
            element: <CategoryList />,
          },
          {
            path: "subcategories",
            element: <SubCategoryList />,
          },
          {
            path: "Inventory",
            element: <MyProductScreen />,
          },
          {
            path: "MyProducts",
            element: <MyProductScreen />,
          },
          {
            path: "users",
            element: <UserList />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "customers",
            element: <CustomerList />,
          },
          {
            path: "allorders",
            element: <AllOrders />,
          },
          {
            path: "tocancel",
            element: <ToCancell />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);
