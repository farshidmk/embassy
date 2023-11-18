import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React from "react";

const Dashboard = () => {
  const Auth = useAuth();
  useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
  });
  return <div>{/* <img src="/assets/images/logo-dark.png" /> */}</div>;
};

export default Dashboard;
