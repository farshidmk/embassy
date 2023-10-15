import { Container, TextField, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" textAlign="left" fontWeight={700}>
        پروفایل کاربری
      </Typography>
      {ITEMS.map((item) => (
        <TextField name={item.field} label={item.label} sx={{ m: 1 }} size="small" />
      ))}
    </Container>
  );
};

export default Profile;

const ITEMS: { label: string; field: string }[] = [
  { label: "نام", field: "firstName" },
  { label: "نام خانوداگی", field: "lastName" },
  { label: "کد ", field: "personnelCode" },
  { label: "تلفن", field: "phone" },
];
