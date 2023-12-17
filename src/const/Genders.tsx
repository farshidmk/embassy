import { SxProps, Typography } from "@mui/material";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { TGender } from "types/gender";

const style: SxProps = {
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  "& svg": {
    mr: 1.5,
  },
};

export const GENDER_SELECT: GenderSelect[] = [
  {
    value: "male",
    title: (
      <Typography variant="body1" sx={{ ...style, color: (theme) => theme.palette.primary.main }}>
        <ManIcon />
        Male
      </Typography>
    ),
  },
  {
    value: "female",
    title: (
      <Typography variant="body1" sx={{ ...style, color: (theme) => theme.palette.secondary.main }}>
        <WomanIcon />
        Female
      </Typography>
    ),
  },
];

type GenderSelect = {
  title: React.ReactElement;
  value: TGender;
};
