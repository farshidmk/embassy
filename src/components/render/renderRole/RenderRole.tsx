import React from "react";
import { TRoles } from "types/role";
import { Chip, Tooltip } from "@mui/material";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

type Props = {
  role: TRoles;
};

const RenderRole: React.FC<Props> = ({ role }) => {
  switch (role) {
    case "parent":
      return <Chip color="primary" label="Parent" icon={<EscalatorWarningIcon />} sx={{ width: "100px" }} />;
    case "student":
      return <Chip color="primary" label="Student" icon={<LocalLibraryIcon />} sx={{ width: "100px" }} />;
    case "teacher":
      return <Chip color="primary" label="Teacher" icon={<CastForEducationIcon />} sx={{ width: "100px" }} />;
    case "admin":
      return <Chip color="primary" label="Admin" icon={<AdminPanelSettingsIcon />} sx={{ width: "100px" }} />;
  }
};

export default RenderRole;
