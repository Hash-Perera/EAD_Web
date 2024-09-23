import React from "react";
import { motion } from "framer-motion";

const MainContent = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "tween", duration: 0.25 }}
      className=" bg-light  w-100 m-2 rounded-4 p-2"
    >
      <div className="">{children}</div>
    </motion.div>
  );
};

export default MainContent;
