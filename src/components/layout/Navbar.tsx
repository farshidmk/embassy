import { Box, IconButton, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import { DRAWER_WIDTH } from "./Layout";
import { useAuth } from "hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import "./Navbar.css";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
};

const Navbar: React.FC<Props> = ({ open, handleDrawerOpen }) => {
  const Auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpenUserMenu = Boolean(anchorEl);

  return (
    <>
      <Popover
        open={isOpenUserMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="account-menu">
          <Button
            className="account-menu-btn"
            endIcon={<AccountCircleIcon />}
            onClick={() => navigate("/user/profile")}
            variant="contained"
            color="info"
            sx={{ color: (theme) => theme.palette.text.primary }}
            fullWidth
          >
            Profile
          </Button>

          <Button
            className="account-menu-btn"
            sx={{ mt: 1, color: (theme) => theme.palette.text.primary }}
            color="warning"
            variant="contained"
            endIcon={<Logout />}
            onClick={Auth?.logout}
          >
            Logout
          </Button>
        </Box>
      </Popover>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: (theme) => theme.palette.grey[800],
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Club Manger{" "}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircleIcon sx={{ fontSize: "28px" }} color="inherit" />
            </IconButton>
            <Typography variant="body2" color="inherit" fontWeight={600}>
              {Auth?.userInfo?.full_name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
