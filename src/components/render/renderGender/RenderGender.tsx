import React from "react";
import { TGender } from "types/gender";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Tooltip } from "@mui/material";

type Props = {
  gender: TGender;
};

const RenderGender: React.FC<Props> = ({ gender }) => {
  switch (gender) {
    case "female":
      return (
        <Tooltip title="Female">
          <FemaleIcon
            fontSize="large"
            sx={{ borderRadius: "50%", background: '#e28ead', color: "#555", p: 0.5 }}
          />
        </Tooltip>
      );
    case "male":
      return (
        <Tooltip title="Male">
          <MaleIcon
            fontSize="large"
            sx={{ borderRadius: "50%", background: '#93e1f0', color: "#555", p: 0.5 }}
          />
        </Tooltip>
      );

    default:
      return <>---</>;
  }
};

export default RenderGender;
