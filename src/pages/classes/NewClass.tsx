import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IRenderFormInput } from "types/render";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { useAuth } from "hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "components/Alert/ErrorAlert";
import { IClasses } from "types/classes";
import TimeSpan from "components/timeSpan/TimeSpan";
import { ITimeSpan, PERIODS, TDaysOfWeek } from "types/timeSpan";

type Props = {};

const NewClass = (props: Props) => {
  const Auth = useAuth();
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [timeSpan, setTimeSpan] = useState<ITimeSpan>(DEFAULT_TIME_SPAN);

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: Auth?.serverCall,
  });
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IClasses>();

  function onBack() {
    navigate("/classes");
  }

  const onSubmitHandler = (data: IClasses) => {
    setError("");
    mutate(
      {
        entity: "classes/",
        method: "post",
        data: {
          ...data,
          class_time_span: timeSpan,
        },
      },
      {
        onSuccess: (res: any) => {
          queryClient.refetchQueries({ queryKey: ["classes"] });
          snackbar(res.message, "success");
          onBack();
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
          {CLASS_ITEMS.map((item) => (
            <Grid item key={item.name} xs={12} md={3}>
              <Controller
                name={item.name as keyof IClasses}
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
        <TimeSpan
          timeSpanValue={timeSpan}
          onChange={(day: TDaysOfWeek, period: PERIODS) => {
            let newPeriod = [...timeSpan[day]];
            const index = newPeriod?.indexOf(period);
            if (index > -1) {
              newPeriod.splice(index, 1);
            } else {
              newPeriod.push(period);
            }
            setTimeSpan((p) => ({ ...p, [day]: [...newPeriod] }));
          }}
        />
        {error && <ErrorAlert text={error} />}
        <FormButtons onBack={onBack} onSave={handleSubmit(onSubmitHandler)} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default NewClass;

const CLASS_ITEMS: IRenderFormInput[] = [{ name: "class_name", inputType: "text", label: "Class Name" }];

const DEFAULT_TIME_SPAN: ITimeSpan = {
  Sun: [],
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
};
