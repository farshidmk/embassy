import { TRoles } from "types/role";
import { SxProps, Typography } from "@mui/material";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const style: SxProps = {
  display: "flex",
  alignItems: "center",
  "& svg": {
    mr: 2,
  },
};

export const ROLE_SELECT: RoleSelect[] = [
  {
    value: "parent",
    title: (
      <Typography variant="body1" sx={style}>
        <EscalatorWarningIcon /> Parent{" "}
      </Typography>
    ),
  },
  {
    value: "student",
    title: (
      <Typography variant="body1" sx={style}>
        <LocalLibraryIcon /> Student{" "}
      </Typography>
    ),
  },
  {
    value: "teacher",
    title: (
      <Typography variant="body1" sx={style}>
        <CastForEducationIcon /> Teacher{" "}
      </Typography>
    ),
  },
  {
    value: "admin",
    title: (
      <Typography variant="body1" sx={style}>
        <AdminPanelSettingsIcon /> Admin{" "}
      </Typography>
    ),
  },
];

type RoleSelect = {
  title: React.ReactElement;
  value: TRoles;
};
