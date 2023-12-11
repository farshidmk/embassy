import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React from "react";

const Dashboard = () => {
  const Auth = useAuth();
  const { data, status, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: Auth?.getRequest,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
  });
  const { data: clubs } = useQuery({
    queryKey: ["clubs"],
    queryFn: Auth?.getRequest,
  });
  // const { data, status, refetch } = useQuery({
  //   queryKey: ["classes/"],
  //   queryFn: Auth?.getRequest,
  // });
  return <div>{/* <img src="/assets/images/logo-dark.png" /> */}</div>;
};

export default Dashboard;

// parent
// teacher
// student
// admin
// 09398153120
