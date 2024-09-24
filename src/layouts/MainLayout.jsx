import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  /*   const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]); */

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default MainLayout;
