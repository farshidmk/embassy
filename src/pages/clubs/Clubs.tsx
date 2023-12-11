import { Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import CreateNewItem from "components/buttons/CreateNewItem";
import CustomDataGrid from "components/dataGrid/CustomDataGrid";
import ErrorHandler from "components/errorHandler/ErrorHandler";
import ShowUser from "components/render/showUser/ShowUser";
import { useAuth } from "hooks/useAuth";
import React, { useMemo } from "react";
import { IClub } from "types/club";

const Clubs = () => {
  const Auth = useAuth();
  const columns = useMemo(
    (): GridColDef<IClub>[] => [
      {
        field: "uid",
        headerName: "UID",
        flex: 1,
      },
      { field: "title", headerName: "Title", flex: 1 },
      {
        field: "CreatedOn",
        headerName: "Create Date",
        flex: 1,
        renderCell: ({ value }) => {
          let date = new Date(value);
          return date.toLocaleString();
        },
      },
      { field: "picture", headerName: "Picture", flex: 1 },
      {
        field: "discription",
        headerName: "Description",
        flex: 1,
        renderCell: ({ value }) => {
          return value;
        },
      },
      {
        field: "end_date",
        headerName: "End Date",
        flex: 1,
        renderCell: ({ value }) => {
          let date = new Date(value);
          return date.toLocaleString();
        },
      },
      { field: "time_span", headerName: "Time Span", flex: 1 },
      { field: "capacity", headerName: "Capacity", flex: 1 },
      { field: "Created", headerName: "Created By", flex: 1, renderCell: ({ value }) => <ShowUser userId={value} /> },
      { field: "teacher", headerName: "Teacher", flex: 1 },
      { field: "right_class", headerName: "Right Class", flex: 1 },
    ],
    []
  );
  const { data, status, refetch } = useQuery({
    queryKey: ["clubs"],
    queryFn: Auth?.getRequest,
  });

  return (
    <>
      <CreateNewItem name="club" />
      {status === "error" ? (
        <ErrorHandler onRefetch={refetch} />
      ) : status === "loading" ? (
        <Skeleton width={"100%"} height={"300px"} />
      ) : status === "success" ? (
        <CustomDataGrid columns={columns} rows={data || []} getRowId={(row) => "uid"} />
      ) : null}
    </>
  );
};

export default Clubs;
