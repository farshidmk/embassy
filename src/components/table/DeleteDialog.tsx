import React from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  handleClose: () => void;
  handleDelete: () => void;
  isLoading: boolean;
};

const DeleteDialog = ({ open, title = "Delete Item", message, handleClose, handleDelete, isLoading }: Props) => {
  return (
    <Dialog sx={{ minWidth: "400px", minHeight: "200pdx" }} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          variant="contained"
          endIcon={<DeleteIcon />}
          color="error"
          sx={{ mx: 2, width: "150px" }}
          autoFocus
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress /> : "Delete"}
        </Button>
        <Button
          variant="outlined"
          endIcon={<CloseOutlinedIcon />}
          color="warning"
          sx={{ mx: 2, width: "150px" }}
          onClick={handleClose}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
