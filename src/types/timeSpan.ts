export const TIME_SPANS = [
  { label: "P1", time: "07:45-08:30" },
  { label: "P2", time: "08:35-09:20" },
  { label: "P3", time: "09:20-09:40" },
  { label: "P4", time: "09:40-10:25" },
  { label: "P5", time: "10:30-11:15" },
  { label: "P6", time: "11:15-11:40" },
  { label: "P7", time: "11:40-12:25" },
  { label: "P8", time: "12:30-13:15" },
  { label: "P9", time: "13:15-13:50" },
  { label: "P10", time: "13:50-14:35" },
  { label: "P11", time: "14:40-15:25" },
  { label: "P12", time: "15:30-16:45" },
] as const;

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type TDaysOfWeek = (typeof DAYS_OF_WEEK)[number];

export type PERIODS = (typeof TIME_SPANS)[number]["label"];

export type ITimeSpan = Record<(typeof DAYS_OF_WEEK)[number], PERIODS[]>;
