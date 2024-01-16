import { Box, Button, Grid, FormControl, InputAdornment, TextField} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  icon?: React.ReactElement;
  name: string;
  url?: string;
};

const CreateNewItem: React.FC<Props> = ({ icon, name, url }) => {
  const navigate = useNavigate();
  return (
    <Box component="section">
      <Grid container spacing={2}>
        <Grid item spacing={2} xs={12} md={6}>
          <Button
            variant="contained"
            className="test"
            endIcon={icon || <AddCircleIcon />}
            onClick={() => navigate(url || "new")}
            sx={{ minWidth: "100px", mb: 2 }}
          >
            create {name}
          </Button>
        </Grid>
        <Grid item spacing={2} xs={12} md={6}>
        <FormControl sx={{float: "right"}}>
        <TextField
          size="small"
          variant="outlined"
          sx={{backgroundColor: "rgba(255,255,255,0.8)"}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
              >
                <ClearIcon />
              </InputAdornment>
            )
          }}
        />
      </FormControl>
        </Grid>
      </Grid>

    </Box>
  );
};

export default CreateNewItem;
