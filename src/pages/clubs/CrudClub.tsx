import { Box, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorAlert from "components/Alert/ErrorAlert";
import FormButtons from "components/render/buttons/FormButtons";
import RenderFormInput from "components/render/formInputs/RenderFormInput";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth";
import { useSnackbar } from "hooks/useSnackbar";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRenderFormInput } from "types/render";
import { IClub } from "types/club";
import { IUser } from "types/user";
import { IClasses } from "types/classes";
import TimeSpan, { DEFAULT_TIME_SPAN } from "components/timeSpan/TimeSpan";
import { ITimeSpan, PERIODS, TDaysOfWeek } from "types/timeSpan";
import Typography from "@mui/material/Typography";
import "./NewClub.css";
import { TCrudType } from "types/types";
type Props = {};

const CrudClub = (props: Props) => {
  const Auth = useAuth();
  const { clubId } = useParams();
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mode: TCrudType = !clubId ? "CREATE" : "EDIT";

  const [timeSpan, setTimeSpan] = useState<ITimeSpan>(DEFAULT_TIME_SPAN);

  const {
    data: teachers,
    status: teachersStatus,
    refetch: teachersRefetch,
  } = useQuery({
    queryKey: ["user/get-by-role/teacher"],
    queryFn: Auth?.getRequest,
    select: (teachers: IUser[]) =>
      teachers?.map((teacher) => ({ title: teacher.first_name + " " + teacher.last_name, value: teacher.uid })),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const {
    data: classes,
    status: classesStatus,
    refetch: classesRefetch,
  } = useQuery({
    queryKey: ["/classes/"],
    queryFn: Auth?.getRequest,
    select: (classes: IClasses[]) => classes?.map((c) => ({ title: c.class_name, value: c.uid })),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: Auth?.serverCall,
  });
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<IClub>();

  function onBack() {
    navigate("/clubs");
  }

  const onSubmitHandler = (data: IClub) => {
    setError("");
    mutate(
      {
        entity: "clubs/",
        method: "post",
        data: {
          ...data,
          day_time: timeSpan,
          capacity: parseInt(`${data.capacity}`),
        },
      },
      {
        onSuccess: (res: any) => {
          if (res.code !== 200) {
            setError(res.message);
          } else {
            queryClient.refetchQueries({ queryKey: ["clubs"] });
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

  const CLUB_ITEMS = useMemo(
    (): IRenderFormInput[] => [
      { name: "name", inputType: "text", label: "Name" },
      { name: "discription", inputType: "text", label: "Description" },
      { name: "start", inputType: "date", label: "Start Date", watch, setValue },
      { name: "end", inputType: "date", label: "End Date", watch, setValue },
      { name: "capacity", inputType: "text", label: "Capacity" },
      // -------
      {
        name: "teacher",
        inputType: "select",
        // inputType: "autocomplete",
        label: "Teacher",
        options: teachers,
        status: teachersStatus,
        refetch: teachersRefetch,
      },
      {
        name: "right_class",
        inputType: "select",
        label: "Related class",
        options: classes,
        status: classesStatus,
        refetch: classesRefetch,
      },
      { name: "picture", inputType: "text", label: "Picture" }, //
    ],
    [classes, classesRefetch, classesStatus, setValue, teachers, teachersRefetch, teachersStatus, watch]
  );

  return (
    <>
      <Box component="section" className="form-holder">
        <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
          How to?
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          Note that before creating the club, you must have defined the classes and after entering the relevant
          information according to the class schedule, specify the running times of the club.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {CLUB_ITEMS.map((item) => (
              <Grid item key={item.name} xs={12} md={3}>
                <Controller
                  name={item.name as keyof IClub}
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
      </Box>
    </>
  );
};

export default CrudClub;
