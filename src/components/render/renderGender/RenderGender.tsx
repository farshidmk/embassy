import React from "react";
import { TGender } from "types/gender";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { Tooltip } from "@mui/material";

type Props = {
  gender: TGender;
};

const RenderGender: React.FC<Props> = ({ gender }) => {
  switch (gender) {
    case "female":
      return (
        <Tooltip title="Female">
          <WomanIcon
            fontSize="large"
            sx={{ borderRadius: "50%", background: (theme) => theme.palette.info.dark, color: "white", p: 0.5 }}
          />
        </Tooltip>
      );
    case "male":
      return (
        <Tooltip title="Male">
          <ManIcon
            fontSize="large"
            sx={{ borderRadius: "50%", background: (theme) => theme.palette.info.light, color: "black", p: 0.5 }}
          />
        </Tooltip>
      );

    default:
      return <>---</>;
  }
};

export default RenderGender;
