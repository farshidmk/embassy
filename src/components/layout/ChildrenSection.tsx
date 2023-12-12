import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React from "react";

const ChildrenSection = () => {
  const Auth = useAuth();
  const { data, status, refetch } = useQuery({
    queryKey: ["user/get_children"],
    queryFn: Auth?.getRequest,
  });
  return <Box>ChildrenSection</Box>;
};

export default ChildrenSection;
