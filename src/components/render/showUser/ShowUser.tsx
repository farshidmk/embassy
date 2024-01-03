import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ErrorHandler from "components/errorHandler/ErrorHandler";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { TRoles } from "types/role";
import { IUser } from "types/user";

type Props = {
  userId: string;
  role?: TRoles;
};

const ShowUser: React.FC<Props> = ({ userId, role }) => {
  const Auth = useAuth();
  const {
    data: users,
    status,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
    select: (res): IUser[] => JSON.parse(res),
    onSuccess: (users) => console.log({ users }),
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  if (status === "loading") return <LinearProgress />;
  if (status === "error") return <ErrorHandler onRefetch={refetch} />;

  let user = users.find((u) => u.uid === userId);
  return <span>{user ? user.first_name + " " + user.last_name : "Not Found"}</span>;
};

export default ShowUser;
