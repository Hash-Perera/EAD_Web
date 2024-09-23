import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "tween", duration: 0.25 }}
      className="sidebar border-end"
      style={{ height: "100vh" }}
    >
      <div className="sidebar border-end" style={{ height: "100vh" }}>
        <div className="sidebar-header border-bottom">
          <div className="sidebar-brand  text-black ">EAD APP</div>
        </div>
        {children}

        <div className="sidebar-footer border-top d-flex">
          <button className="sidebar-toggler" type="button"></button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
