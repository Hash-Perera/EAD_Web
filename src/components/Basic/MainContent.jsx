import React from "react";
import { motion } from "framer-motion";
import BreadCrumb from "./BreadCrumb";
import Sidebar from "./Sidebar.jsx";

const MainContent = ({ children }) => {
  return (
    <>
      <div className=" d-flex bg-white ">
        <Sidebar />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "tween", duration: 0.25 }}
          className=" overflow-y-auto bg-light w-100 m-2 rounded-4 p-2"
        >
          <div className="">
            <BreadCrumb />
            {children}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MainContent;
