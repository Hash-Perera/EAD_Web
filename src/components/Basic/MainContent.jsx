import React from "react";
import { motion } from "framer-motion";
import BreadCrumb from "./BreadCrumb";
import Sidebar from "./Sidebar.jsx";

const MainContent = ({ children }) => {
  return (
    <>
      <div className=" d-flex bg-white ">
        <Sidebar />
        <div className=" overflow-y-auto bg-light w-100 m-2 rounded-4 p-2">
          <div className="">
            <BreadCrumb />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
