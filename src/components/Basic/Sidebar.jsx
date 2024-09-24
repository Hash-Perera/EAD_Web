import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = () => {
  return (
    <div className="sidebar border-end" style={{ height: "100vh" }}>
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
        <div style={{ flexGrow: 1 }}>
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
            <ListItem>
              <ListItemButton href="/dashboard/users" className=" gap-4">
                <PersonIcon />
                <ListItemText primary={"Users"} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <Divider />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Stack spacing={0} direction="column">
            <Typography variant="h7">Hashan Perera</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Admin
            </Typography>
          </Stack>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Sidebar;
