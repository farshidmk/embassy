import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import RightMenu from "./RightMenu";
import { styled } from "@mui/material/styles";
import { Container, CssBaseline, Grid, Breadcrumbs, Link, Typography } from "@mui/material";

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
          <Container maxWidth="xl">
            <Box sx={{ p: 2, width: "100%", height: "100%" }}>
              <Grid container>
                <Grid item md={12}>
                  <Typography variant="h3" color="text.primary">Create User</Typography>
                  <Breadcrumbs sx={{ mb:2, mt:2 }} aria-label="breadcrumb">
                    <Link underline="none" color="inherit" href="/">
                      Dashboard
                    </Link>
                    <Link underline="none"
                      color="inherit"
                      href="/material-ui/getting-started/installation/"
                    >
                      Users
                    </Link>
                    <Typography color="text.primary">Create User</Typography>
                  </Breadcrumbs>

                </Grid>
              </Grid>
              {children}</Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
