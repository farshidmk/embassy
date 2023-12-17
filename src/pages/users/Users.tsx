import { Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import CreateNewItem from "components/buttons/CreateNewItem";
import CustomDataGrid from "components/dataGrid/CustomDataGrid";
import ErrorHandler from "components/errorHandler/ErrorHandler";
import RenderGender from "components/render/renderGender/RenderGender";
import RenderRole from "components/render/renderRole/RenderRole";
// import ShowUser from "components/render/showUser/ShowUser";
import { useAuth } from "hooks/useAuth";
import React, { useMemo } from "react";
import { ILoggedInUser } from "types/user";

const Users = () => {
  const Auth = useAuth();

  const columns = useMemo(
    (): GridColDef<ILoggedInUser>[] => [
      {
        field: "first_name",
        headerName: "First Name",
        flex: 1,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        flex: 1,
      },
      { field: "username", headerName: "Username", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "role", headerName: "Role", flex: 1, renderCell: ({ value }) => <RenderRole role={value} /> },
      {
        field: "gender",
        headerName: "Gender",
        flex: 1,
        renderCell: ({ value }) => {
          return <RenderGender gender={value} />;
        },
      },
      {
        field: "last_login",
        headerName: "Last Login",
        flex: 1,
        renderCell: ({ value }) => {
          let date = new Date(value);
          return date.toLocaleString();
        },
      },
      { field: "parent", headerName: "Parent", flex: 1 },
    ],
    []
  );
  const { data, status, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: Auth?.getRequest,
    select: (res) => JSON.parse(res),
  });

  return (
    <>
      <CreateNewItem name="user" />
      {status === "error" ? (
        <ErrorHandler onRefetch={refetch} />
      ) : status === "loading" ? (
        <Skeleton width={"100%"} height={"300px"} />
      ) : status === "success" ? (
        <CustomDataGrid columns={columns} rows={data || []} getRowId={(row) => row.uid} />
      ) : null}
    </>
  );
};

export default Users;
