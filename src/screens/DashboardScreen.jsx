import React from "react";
import Sidebar from "../components/Basic/Sidebar.jsx";
import MainContent from "../components/Basic/MainContent.jsx";
import BreadCrumb from "../components/Basic/BreadCrumb.jsx";

const DashboardScreen = () => {
  return (
    <div className=" d-flex bg-white ">
      <Sidebar />

      <MainContent></MainContent>
    </div>
  );
};

export default DashboardScreen;
