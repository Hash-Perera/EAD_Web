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
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <DashboardScreen />,
          },
          {
            path: "products",
            element: <ProductScreen />,
          },
          {
            path: "users",
            element: <UserList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
