import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TimeSpan from "components/timeSpan/TimeSpan";

//TODO: fix time span data
type Props = {
  open: boolean;
  handleClose: () => void;
  timeSpanValue: any;
};

const TimeSpanModal = ({ open, handleClose, timeSpanValue }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TimeSpan timeSpanValue={timeSpanValue} isModalView />
      </Box>
    </Modal>
  );
};

export default TimeSpanModal;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
