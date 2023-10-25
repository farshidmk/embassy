import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React from "react";

const Dashboard = () => {
  const Auth = useAuth();
  const { data, status, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
  });
  // const { data, status, refetch } = useQuery({
  //   queryKey: ["classes/"],
  //   queryFn: Auth?.getRequest,
  // });
  console.log({ data });
  return <div>{/* <img src="/assets/images/logo-dark.png" /> */}</div>;
};

export default Dashboard;
