import React, { useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IRenderFormInput } from "types/render";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { useAuth } from "hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "hooks/useSnackbar";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "components/Alert/ErrorAlert";
import { IClasses } from "types/classes";
import TimeSpan, { DEFAULT_TIME_SPAN } from "components/timeSpan/TimeSpan";
import { ITimeSpan, PERIODS, TDaysOfWeek } from "types/timeSpan";
import { TCrudType } from "types/types";

type Props = {};

const CrudClass = (props: Props) => {
  const Auth = useAuth();
  const { classId } = useParams();
  const mode: TCrudType = !classId ? "CREATE" : "EDIT";
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

export default CrudClass;

const CLASS_ITEMS: IRenderFormInput[] = [{ name: "class_name", inputType: "text", label: "Class Name" }];
