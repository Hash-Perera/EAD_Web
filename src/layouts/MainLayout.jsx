import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AccessControlProvider } from "../components/context/AccessControlContext";

const MainLayout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <AccessControlProvider>
      <main>
        <Outlet />
      </main>
    </AccessControlProvider>
  );
};

export default MainLayout;
