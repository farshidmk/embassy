import { Box, Typography } from "@mui/material";
import React from "react";
import { DAYS_OF_WEEK, ITimeSpan, PERIODS, TDaysOfWeek, TIME_SPANS } from "types/timeSpan";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import "./TimeSpan.module.css";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

type Props = {
  timeSpanValue?: ITimeSpan;
  onChange?: (day: TDaysOfWeek, period: any) => void;
  isModalView?: boolean;
  disabled?: boolean;
  reservedTimeSpan?: ITimeSpan;
};

const TimeSpan = ({
  timeSpanValue = DEFAULT_TIME_SPAN,
  onChange,
  isModalView = false,
  disabled = false,
  reservedTimeSpan,
}: Props) => {
  return (
    <Box component="table" className={`time-span-table ${isModalView ? "modal-view" : ""}`}>
      <Box component="thead">
        <Box component="tr">
          <Box component="th">
            <Typography variant="body1" fontWeight={500}>
              Days / Periods
            </Typography>
          </Box>
          {TIME_SPANS.map((h) => (
            <Box component="th" key={h.label}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" fontWeight={600}>
                  {h.label}
                </Typography>
                <Typography variant="caption" fontStyle="italic">
                  {h.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {DAYS_OF_WEEK.map((day) => (
          <Box component="tr" key={day}>
            <Box component="td">{day}</Box>
            {TIME_SPANS.map((time) => {
              const IS_RESERVED = reservedTimeSpan?.[day]
                ?.map((p) => p.toLocaleUpperCase())
                ?.includes(time.label?.toLocaleUpperCase());

              return (
                <Box
                  key={day + time.label}
                  component="td"
                  onClick={() => {
                    if (isModalView || disabled || IS_RESERVED) return false;
                    //@ts-ignore
                    onChange(day, time.label);
                  }}
                  sx={{ cursor: IS_RESERVED ? "not-allowed" : disabled || isModalView ? "default" : "pointer" }}
                >
                  <ShowDay
                    day={day}
                    period={time.label}
                    timeSpanValue={timeSpanValue}
                    reservedTimeSpan={reservedTimeSpan}
                  />
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimeSpan;

const ShowDay = ({
  day,
  period,
  timeSpanValue,
  reservedTimeSpan,
}: {
  day: TDaysOfWeek;
  period: PERIODS;
  timeSpanValue: ITimeSpan;
  reservedTimeSpan?: ITimeSpan;
}) => {
  const IS_RESERVED = reservedTimeSpan?.[day]?.map((p) => p.toLocaleUpperCase())?.includes(period?.toLocaleUpperCase());
  const IS_FULL = timeSpanValue?.[day]?.map((p) => p.toLocaleUpperCase())?.includes(period?.toLocaleUpperCase());

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {IS_RESERVED ? (
        <DoDisturbOnIcon color="warning" />
      ) : IS_FULL ? (
        <TaskAltOutlinedIcon sx={{ color: "#285b45" }} />
      ) : (
        <CropFreeOutlinedIcon sx={{ color: "#eeb601" }} />
      )}
    </Box>
  );
};

export const DEFAULT_TIME_SPAN: ITimeSpan = {
  Sun: [],
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
};
