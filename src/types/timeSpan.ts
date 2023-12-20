export const TIME_SPANS = [
  { label: "p1", time: "07:45-08:30" },
  { label: "p2", time: "08:35-09:20" },
  { label: "p3", time: "09:20-09:40" },
  { label: "p4", time: "09:40-10:25" },
  { label: "p5", time: "10:30-11:15" },
  { label: "p6", time: "11:15-11:40" },
  { label: "p7", time: "11:40-12:25" },
  { label: "p8", time: "12:30-13:15" },
  { label: "p9", time: "13:15-13:50" },
  { label: "p10", time: "13:50-14:35" },
  { label: "p11", time: "14:40-15:25" },
] as const;

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type TDaysOfWeek = (typeof DAYS_OF_WEEK)[number];
//TODO: add type for timeSpanValue object
