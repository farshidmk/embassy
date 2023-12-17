import { Box, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorAlert from "components/Alert/ErrorAlert";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth";
import { useSnackbar } from "hooks/useSnackbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRenderFormInput } from "types/render";
import { IClub } from "types/club";

type Props = {};

const NewClub = (props: Props) => {
  const Auth = useAuth();
  const snackbar = useSnackbar();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: Auth?.serverCall,
  });
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IClub>();

  function onBack() {
    navigate("/users");
  }

  const onSubmitHandler = (data: IClub) => {
    setError("");
    mutate(
      {
        entity: "users/",
        method: "post",
        data,
      },
      {
        onSuccess: (res: any) => {
          if (res.code !== 200) {
            setError(res.message);
          } else {
            queryClient.refetchQueries({ queryKey: ["users"] });
            snackbar(res.message, "success");
            onBack();
          }
        },
        onError: (res: any) => {
          snackbar(res.message || "Error on creating new user", "error");
        },
      }
    );
  };

  const CLUB_ITEMS: IRenderFormInput[] = [
    { name: "name", inputType: "text", label: "Name" },
    { name: "discription", inputType: "text", label: "Description" },
    { name: "start", inputType: "date", label: "Start Date" },
    { name: "end", inputType: "date", label: "End Date" },
    { name: "capacity", inputType: "text", label: "Capacity" },
    // -------
    { name: "teacher", inputType: "password", label: "Teacher" },
    { name: "right_class", inputType: "password", label: "Right Class" },
    { name: "picture", inputType: "text", label: "Picture" }, //
  ];

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          {CLUB_ITEMS.map((item) => (
            <Grid item key={item.name} xs={12} md={3}>
              <Controller
                name={item.name as keyof IClub}
                control={control}
                render={({ field }) => {
                  return (
                    <RenderFormInput controllerField={field} label={item.label} errors={errors} {...item} {...field} />
                  );
                }}
              />
            </Grid>
          ))}
        </Grid>
        {error && <ErrorAlert text={error} />}
        <FormButtons onBack={onBack} onSave={handleSubmit(onSubmitHandler)} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default NewClub;
