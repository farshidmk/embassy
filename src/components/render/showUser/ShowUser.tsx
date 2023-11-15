import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { IUser } from "types/user";

type Props = {
  userId: string;
};

const ShowUser: React.FC<Props> = ({ userId }) => {
  const Auth = useAuth();
  const {
    data: users,
    status,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
  });

  if (status === "loading") return <LinearProgress />;
  //   const user = users?.find((user: IUser) => user.id === userId);
  return <span>1</span>;
};

export default ShowUser;
