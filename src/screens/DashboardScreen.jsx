import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import MainContent from "../components/MainContent.jsx";
import BreadCrumb from "../components/BreadCrumb.jsx";

const DashboardScreen = () => {
  return (
    <div className=" d-flex bg-white ">
      <Sidebar>
        <ul className="sidebar-nav gap-2">
          <li className="nav-title">Nav Title</li>
          <li className="nav-item">
            <a className="nav-link active" href="">
              <i className="nav-icon cil-speedometer"></i> Nav item
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="">
              <i className="nav-icon cil-speedometer"></i> Nav item
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="">
              <i className="nav-icon cil-speedometer"></i> Nav item
            </a>
          </li>
        </ul>
      </Sidebar>
      <MainContent>
        <BreadCrumb from="Dashboard" to="Home" />
      </MainContent>
    </div>
  );
};

export default DashboardScreen;
