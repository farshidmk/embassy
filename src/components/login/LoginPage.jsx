import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, alpha } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import styles from "./LoginPage.module.css";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please fill the username field"),
  password: Yup.string().required("Please fill the password field"),
});

const LoginPage = () => {
  const Auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: loginRequest,

    onSuccess: (response) => {
      let { first_name, last_name, username, uid } = response.user;
      Auth.setUserInfo({ username, first_name, last_name, uid });
      Auth.storeToken(response.access_token);
      navigate("/dashboard");
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    let { username, password } = data;
    mutate({ password, username });
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={styles.container}
    >
      <Box
        component="form"
        maxWidth={700}
        minWidth={500}
        minHeight={400}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          background: (theme) => alpha(theme.palette.background.paper, 0.9),
          borderRadius: 1,
          boxShadow: "0px 0px 8px 0px white",
          pt: 6,
          pb: 7,
          px: 3,
          overflow: "auto",
        }}
        onSubmitCapture={handleSubmit(onSubmit)}
      >
        <Box component="img" sx={{ width: "auto", height: "90px" }} src="/assets/images/logo-dark.png" alt="logo" />

        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              size="small"
              sx={{ width: "400px", backgroundColor: "#ffffffbb" }}
              error={errors.username?.message}
              helperText={errors.username?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              label="Password"
              size="small"
              sx={{ width: "400px", backgroundColor: "#ffffffbb" }}
              error={errors.password?.message}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button
          variant="contained"
          sx={{ width: "400px" }}
          type="submit"
          endIcon={isLoading && <CircularProgress size={20} color="secondary" />}
          disabled={isLoading}
        >
          Login
        </Button>
        {(error?.message || !!error) && (
          <Alert sx={{ width: "400px" }} severity="error">
            {error?.message || "Error on connecting to server"}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;

async function loginRequest(value) {
  try {
    let response = await axios.post(`http://37.156.145.155:8000/login/`, value);
    return response?.data;
  } catch (error) {
    throw Error(error?.response?.data?.message);
  }
}
