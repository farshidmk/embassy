import React, { useMemo, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "types/user";
import { IRenderFormInput } from "types/render";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { useAuth } from "hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "hooks/useSnackbar";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "components/Alert/ErrorAlert";
import { ROLE_SELECT } from "const/Roles";
import { GENDER_SELECT } from "const/Genders";
import Typography from "@mui/material/Typography";
import "./NewUser.css";
import { TCrudType } from "types/types";
import ErrorHandler from "components/errorHandler/ErrorHandler";

type Props = {};

const CrudUser = (props: Props) => {
  const Auth = useAuth();
  const { userId } = useParams();
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const mode: TCrudType = !userId ? "CREATE" : "EDIT";

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
    select: (parents: IUser[]) =>
      parents?.map((parent) => ({ title: parent.first_name + " " + parent.last_name, value: parent.uid })),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IUser>();

  const { status: userStatus, refetch: userRefetch } = useQuery({
    queryKey: [`user/${userId}`],
    queryFn: Auth?.getRequest,
    enabled: !!userId,
    select: (res) => JSON.parse(res)?.[0] || {},
    onSuccess: (res: IUser) => {
      Object.entries(res).forEach(([key, value]) => {
        setValue(key as keyof IUser, value);
      });
    },
  });

  const USER_ITEM: IRenderFormInput[] = useMemo(
    () => [
      { name: "firstname", inputType: "text", label: "First Name" },
      { name: "lastname", inputType: "text", label: "Last Name" },
      { name: "gender", inputType: "select", options: GENDER_SELECT, label: "Gender" },
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
      ...(mode === "CREATE" ? [{ name: "password", inputType: "password", label: "Password" }] : []),
    ],
    [mode, parents, parentsRefetch, parentsStatus]
  );

  function onBack() {
    navigate("/users");
  }

  const onSubmitHandler = (data: IUser) => {
    setError("");
    mutate(
      {
        entity: "users/",
        method: mode === "EDIT" ? "put" : "post",
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

  if (mode === "EDIT" && userStatus === "loading") {
    return <Skeleton height={400} />;
  }
  if (mode === "EDIT" && userStatus === "error") {
    return <ErrorHandler onRefetch={userRefetch} errorText="Error On Fetching User Info" />;
  }

  return (
    <>
      <Box component="section" className="form-holder">
        <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
          How to?
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 5 }}>
          To create a new user in the system, enter their information in the form below, and if the type of user created
          is "student", you must select the parents' information from the relevant box.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            {USER_ITEM.map((item) => (
              <Grid item key={item.name} xs={12} md={4}>
                <Controller
                  name={item.name as keyof IUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <RenderFormInput
                        controllerField={field}
                        label={item.label}
                        errors={errors}
                        {...item}
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {error && <ErrorAlert text={error} />}
          <FormButtons onBack={onBack} onSave={handleSubmit(onSubmitHandler)} isLoading={isLoading} />
        </Box>
      </Box>
    </>
  );
};

export default CrudUser;
