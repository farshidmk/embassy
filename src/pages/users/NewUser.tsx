import React, { useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "types/user";
import { IRenderFormInput } from "types/render";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { useAuth } from "hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "components/Alert/ErrorAlert";
import { ROLE_SELECT } from "const/Roles";

type Props = {};

const NewUser = (props: Props) => {
  const Auth = useAuth();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: Auth?.serverCall,
  });
  const [error, setError] = useState("");

  const {
    data: parents,
    status: parentsStatus,
    refetch: parentsRefetch,
  } = useQuery({
    queryKey: ["user/get-by-role/parent"],
    queryFn: Auth?.getRequest,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IUser>();

  const USER_ITEM: IRenderFormInput[] = useMemo(
    () => [
      { name: "firstname", inputType: "text", label: "First Name" },
      { name: "lastname", inputType: "text", label: "Last Name" },
      { name: "gender", inputType: "text", label: "Gender" },
      { name: "role", inputType: "select", options: ROLE_SELECT, label: "Role" },
      {
        name: "parent",
        inputType: "select",
        label: "Parent",
        options: parents,
        status: parentsStatus,
        refetch: parentsRefetch,
      },
      { name: "mail", inputType: "text", label: "Email" },
      { name: "password", inputType: "password", label: "Password" },
    ],
    [parents, parentsRefetch, parentsStatus]
  );

  function onBack() {
    navigate("/users");
  }

  const onSubmitHandler = (data: IUser) => {
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

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          {USER_ITEM.map((item) => (
            <Grid item key={item.name} xs={12} md={3}>
              <Controller
                name={item.name as keyof IUser}
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

export default NewUser;
