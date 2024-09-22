import ReactDOM from "react-dom/client";
import React from "react";
import RootLayout from "./layouts/RootLayout.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";

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
        path: "dashboad",
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <HomeScreen />,
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
