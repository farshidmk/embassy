import React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DRAWER_WIDTH, DrawerHeader } from "./Layout";
import { Link } from "react-router-dom";
import { Box, Icon, SvgIcon } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import "./RightMenu.css";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = {
  open: boolean;
  handleDrawerClose: () => void;
};

const RightMenu: React.FC<Props> = ({ open, handleDrawerClose }) => {
  return (
    <Drawer className="bg-color" variant="permanent" open={open}>
      <DrawerHeader
        sx={{
          background: (theme) => theme.palette.grey[800],
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="img" src="/logo192.png" sx={{ width: "auto", height: "30px", ml: 2 }} />
        <IconButton onClick={handleDrawerClose} sx={{ color: '#333',backgroundColor: '#fff'}}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ height: "100%", pt:5, }}>
        {MENU_ITEMS?.map((menu) => {
          return (
            <Link key={menu.title} to={menu.link} className="menu-link" style={{textDecoration: "none", textTransform: "uppercase"}}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  className="menu-btn"
                  sx={{
                    minHeight: 60,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  // onClick={handleClick}
                >
                  <ListItemIcon
                    className="menu-icon"
                    sx={{
                      minWidth: 0,
                      backgroundColor: 'transparent',
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ShowIcon icon={menu.icon} />
                  </ListItemIcon>
                  <ListItemText
                    className="menu-text"
                    primary={menu.title}
                    sx={{
                      ml: 1,
                      backgroundColor: 'transparent',
                      opacity: open ? 1 : 0,
                      fontSize: open ? "1rem" : "8px",
                      textWrap: open ? "wrap" : "no-wrap",
                      color: (theme) => theme.palette.secondary.main,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default RightMenu;

function ShowIcon(props: { icon?: string | React.ReactElement; color?: any }) {
  if (!props?.icon) return <AppsIcon />;
  if (typeof props.icon === "string" && props.icon.toLocaleUpperCase().startsWith("SVG")) {
    return (
      <SvgIcon color={props?.color ? props.color : "primary"}>
        <path d={props.icon.substring(3)} />
      </SvgIcon>
    );
  }
  return <Icon color={props?.color ? props.color : "secondary"}>{props.icon}</Icon>;
}

const MENU_ITEMS = [
  {
    title: "Dasboard",
    icon: <SpaceDashboardOutlinedIcon />,
    link: "/",
  },
  {
    title: "Users",
    icon: <GroupAddOutlinedIcon />,
    link: "users",
  },
  {
    title: "Clubs",
    icon: <ExtensionOutlinedIcon />,
    link: "clubs",
  },
  {
    title: "Classes",
    icon: <ClassOutlinedIcon />,
    link: "classes",
  },
  {
    title: "Registrations",
    icon: <HowToRegOutlinedIcon />,
    link: "/",
  },
];
