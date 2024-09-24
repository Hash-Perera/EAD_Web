import React from "react";
import { motion } from "framer-motion";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "tween", duration: 0.25 }}
      className="sidebar border-end"
      style={{ height: "100vh" }}
    >
      <Drawer
        sx={{
          width: "16rem",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "16rem",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <List>
          <ListItem>
            <ListItemButton href="/dashboard/home" className=" gap-4">
              <DashboardIcon />
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton href="/dashboard/products" className=" gap-4">
              <ProductionQuantityLimitsIcon />
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </motion.div>
  );
};

export default Sidebar;
