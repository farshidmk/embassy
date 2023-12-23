import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import RightMenu from "./RightMenu";
import { styled } from "@mui/material/styles";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Layout.css";

export const DRAWER_WIDTH = 280;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <RightMenu open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="div" sx={{ width: "100%", flexDirection: "column", overflowX: "hidden", height: "100vh" }}>
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1, width: "100%", height: "100vh" }}
        >
          <DrawerHeader />
          <Container className="main-bg" maxWidth="xl" sx={{ flex: 1, overflow: "auto" }}>
            <Box sx={{ p: 2, width: "100%", height: "100%" }}>
              <Header />
              {children}
            </Box>
          </Container>
          <Box className="bg-color" component="footer" sx={{ p: 2 }}>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="body1">
                  All Rights Reserved © DBST 2023.
                </Typography>
              </Grid>
              <Grid item md={6} textAlign={"right"}>
                <Typography variant="subtitle1">
                  Designed & Developed: 
                  <Link to="https://fbsp.co.ir" className="Footer-Link" target="_blank">
                     FBSP
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
