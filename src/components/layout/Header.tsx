import { Breadcrumbs, Grid, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import "./Header.css";

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
    <Grid container sx={{mt:2, mb: 6, py:2 ,px: 2, backgroundColor: '#edece7', border: '1px solid  rgba(0, 0, 0, 0.12)',borderRadius: '20px'}}>
      <Grid item md={6}>
        <Typography variant="h5" color="text.primary">
          {title === "new" ? "Create " + paths[paths.length - 2] : title}
        </Typography>
      </Grid>
      <Grid item md={6} flexDirection={"row-reverse"} >
        <Breadcrumbs className="Breadcrumbs-Holder" maxItems={3} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link className="Breadcrumbs-Nav" to={`/`}>
            ِDashboard
          </Link>
          {crumbs.map((crumb) => (
            <Link className="Breadcrumbs-Nav" key={crumb.link} to={`/${crumb.link}`}>
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Header;
