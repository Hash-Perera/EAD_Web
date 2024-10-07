import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import InventoryIcon from '@mui/icons-material/Inventory';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from '@mui/icons-material/Cancel';
import Box from "@mui/material/Box";
import { Roles } from "../../constants/Roles";
import RoleBasedComponent from "../../components/context/RoleBaseComponent";
import {
  getUserName,
  getUserRole,
  logout,
  getProfileImage,
} from "../../utils/auth";

const settings = [
  { title: "Profile", func: () => {} },
  {
    title: "Logout",
    func: () => {
      logout();
    },
  },
];

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="sidebar border-end" style={{ height: "100vh" }}>
      <Drawer
        sx={{
          width: "16rem",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "16rem",
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="../../../public/logo_2.jpg"
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div style={{ flexGrow: 1 }}>
          <List
            sx={{
              "& .MuiListItemButton-root": {
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiListItemText-root": {
                color: "white",
              },
              "& .MuiTypography-root": {
                color: "white",
              },
            }}
          >
            <RoleBasedComponent allowedRoles={[Roles.ADMIN, Roles.Customer]}>
              <ListItem>
                <ListItemButton href="/dashboard/home" className="gap-4">
                  <DashboardIcon />
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.ADMIN, Roles.VENDOR]}>
              <ListItem>
                <ListItemButton href="/dashboard/products" className="gap-4">
                  <ProductionQuantityLimitsIcon />
                  <ListItemText primary={"Products"} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton href="/dashboard/Inventory" className="gap-4">
                  <ProductionQuantityLimitsIcon />
                  <ListItemText primary={"Inventory"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>

            <RoleBasedComponent allowedRoles={[Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/users" className="gap-4">
                  <PersonIcon />
                  <ListItemText primary={"Users"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.VENDOR,Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/orders" className="gap-4">
                  <PersonIcon />
                  <ListItemText primary={"Orders"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.VENDOR, Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/reviews" className="gap-4">
                  <PersonIcon />
                  <ListItemText primary={"Reviews"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.CSR, Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/customers" className="gap-4">
                  <PersonIcon />
                  <ListItemText primary={"Customers"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.CSR, Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/allorders" className=" gap-4">
                <InventoryIcon />
                  <ListItemText primary={"All Orders"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={[Roles.CSR, Roles.ADMIN]}>
              <ListItem>
                <ListItemButton href="/dashboard/tocancel" className=" gap-4">
                <CancelIcon/>
                  <ListItemText primary={"Cancel Requests"} />
                </ListItemButton>
              </ListItem>
            </RoleBasedComponent>
          </List>
        </div>
        <Divider sx={{ backgroundColor: "white" }} />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={getProfileImage()} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.func}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Stack spacing={0} direction="column">
            <Typography variant="h7"> {getUserName()}</Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              {getUserRole()}
            </Typography>
          </Stack>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Sidebar;
