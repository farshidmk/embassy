import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Grid } from "@mui/material";
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

    <Grid container sx={{backgroundColor: "#edece7"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sx={{
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "column",
        borderRadius: 1,
        pt: 6,
        pb: 7,
        overflow: "auto",
      }} className={styles.FullHeight} md={4}>

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
            backgroundColor: "#edece7",
            borderRadius: 2,
            pt: 6,
            pb: 7,
            overflow: "auto",
          }}
          onSubmitCapture={handleSubmit(onSubmit)}
        >
          <Box component="img" sx={{ width: "auto", height: "90px" }} src="/logo192.png" alt="logo" />

          <Controller
            control={control}
            name="username"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                size="medium"
                sx={{ width: "400px",backgroundColor: "#ffffffbb",borderRadius:'50px', }}
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
                size="medium"
                sx={{ width: "400px", backgroundColor: "#ffffffbb",borderRadius:'50px', }}
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
            size="large"
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
      </Grid>
      <Grid item className={styles.FullHeight} md={8}>
            <Box className={styles.LoginImage}
            >

            </Box>
      </Grid>
    </Grid>
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
