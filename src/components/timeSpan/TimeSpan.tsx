import { Box, Typography } from "@mui/material";
import React from "react";
import { DAYS_OF_WEEK, TDaysOfWeek, TIME_SPANS } from "types/timeSpan";

type Props = {
  timeSpanValue?: any;
  onChange?: (day: TDaysOfWeek, period: any) => void;
};

const TimeSpan = ({ timeSpanValue = {}, onChange }: Props) => {
  return (
    <Box component="table">
      <Box component="thead">
        <Box component="tr">
          <Box component="th">
            <Typography variant="body1" fontWeight={500}>
              Days / Periods
            </Typography>
          </Box>
          {TIME_SPANS.map((h) => (
            <Box
              component="th"
              key={h.label}
              sx={{ minWidth: "100px", borderRight: "1px solid", borderBottom: "1px solid" }}
            >
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
            {TIME_SPANS.map((time) => (
              <Box
                key={day + time.label}
                component="td"
                onClick={() => {
                  console.log({ day, time });
                  //@ts-ignore
                  onChange(day, time.label);
                }}
              >
                <ShowDay day={day} period={time.label} timeSpanValue={timeSpanValue} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimeSpan;

const ShowDay = ({ day, period, timeSpanValue }: { day: TDaysOfWeek; period: any; timeSpanValue: any }) => {
  const IS_FULL = timeSpanValue?.[day]?.includes(period);
  return (
    <Box
      sx={{ height: "100%", width: "100%", background: (theme) => theme.palette[IS_FULL ? "warning" : "success"].main }}
    >
      {IS_FULL ? "Full" : "Empty"}
    </Box>
  );
};
