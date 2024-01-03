import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ErrorHandler from "components/errorHandler/ErrorHandler";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { IClasses } from "types/classes";

type Props = {
  classId: string;
};

const ShowClass = ({ classId }: Props) => {
  const Auth = useAuth();
  const { data, status, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: Auth?.getRequest,
    cacheTime: Infinity,
    staleTime: Infinity,
    select: (res): IClasses[] => res,
  });
  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <ErrorHandler onRefetch={refetch} />;
  const result = data?.find((item) => item.uid === classId);
  if (!result) return <Typography>Class Not Found</Typography>;
  return (
    <Typography textAlign="center" fontWeight={700}>
      {result.class_name}
    </Typography>
  );
};

export default ShowClass;
