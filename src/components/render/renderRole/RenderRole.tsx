import React from "react";
import { TRoles } from "types/role";
import { Chip, Tooltip } from "@mui/material";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import SchoolIcon from '@mui/icons-material/School';
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

type Props = {
  role: TRoles;
};

const RenderRole: React.FC<Props> = ({ role }) => {
  switch (role) {
    case "parent":
      return <Chip label="Parent" icon={<EscalatorWarningIcon />} sx={{ width: "100px", backgroundColor: "#edece7"}} />;
    case "student":
      return <Chip label="Student" icon={<SchoolIcon />} sx={{ width: "100px", backgroundColor: "#edece7" }} />;
    case "teacher":
      return <Chip label="Teacher" icon={<SettingsAccessibilityOutlinedIcon />} sx={{ width: "100px", backgroundColor: "#edece7" }} />;
    case "admin":
      return <Chip label="Admin" icon={<AdminPanelSettingsIcon />} sx={{ width: "100px", backgroundColor: "#edece7" }} />;
  }
};
export default RenderRole;
