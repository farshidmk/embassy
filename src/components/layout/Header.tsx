import { Breadcrumbs, Grid, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const location = useLocation();

  let currentLink = "";
  const paths = location.pathname?.split("/")?.filter((path) => !!path);
  const crumbs = paths?.map((path) => {
    currentLink += `/${path}`;
    return { label: path, link: currentLink };
  });

  const title = paths[paths.length - 1];
  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h3" color="text.primary">
          {title === "new" ? "Create " + paths[paths.length - 2] : title}
        </Typography>
        <Breadcrumbs sx={{ mb: 2, mt: 2 }} aria-label="breadcrumb">
          {crumbs.map((crumb) => (
            <Link key={crumb.link} to={`/${crumb.link}`}>
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Header;
