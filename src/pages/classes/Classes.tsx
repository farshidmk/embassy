import { Box, Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import CreateNewItem from "components/buttons/CreateNewItem";
import CustomDataGrid from "components/dataGrid/CustomDataGrid";
import ErrorHandler from "components/errorHandler/ErrorHandler";
import ShowUser from "components/render/showUser/ShowUser";
import { useAuth } from "hooks/useAuth";
import React, { useMemo, useState } from "react";
import { IClasses } from "types/classes";
import TimeSpanModal from "./components/TimeSpanModal";
import { ITimeSpan } from "types/timeSpan";

type Props = {};

const Classes = (props: Props) => {
  const Auth = useAuth();
  const [selectedTimeSpan, setSelectedTimeSpan] = useState<ITimeSpan | undefined>(undefined);

  const columns = useMemo(
    (): GridColDef<IClasses>[] => [
      { field: "class_name", headerName: "Name", flex: 1 },
      {
        field: "Created",
        headerName: "Created By",
        flex: 1,
        renderCell: ({ value }) => {
          return <ShowUser userId={value} />;
        },
      },
      {
        field: "CreatedOn",
        headerName: "Created Time",
        flex: 1,
        renderCell: ({ value }) => {
          let date = new Date(value);
          return date.toLocaleString();
        },
      },
      {
        field: "class_time_span",
        headerName: "Class Time Span",
        flex: 1,
        renderCell: ({ value }) => (
          <Box component="div" onClick={() => setSelectedTimeSpan(value)} sx={{ cursor: "pointer" }}>
            view time span
          </Box>
        ),
      },
    ],
    []
  );
  const { data, status, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: Auth?.getRequest,
  });

  return (
    <>
      <CreateNewItem name="class" />
      {status === "error" ? (
        <ErrorHandler onRefetch={refetch} />
      ) : status === "loading" ? (
        <Skeleton width={"100%"} height={"300px"} />
      ) : status === "success" ? (
        <CustomDataGrid columns={columns} rows={data || []} getRowId={(row) => row.uid} />
      ) : null}
      <TimeSpanModal
        handleClose={() => setSelectedTimeSpan(undefined)}
        open={!!selectedTimeSpan}
        timeSpanValue={selectedTimeSpan}
      />
    </>
  );
};

export default Classes;
