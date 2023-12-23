import React from "react";
import { DataGrid, DataGridProps, GridToolbar } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { IQueryFilter } from "types/types";

interface Props extends DataGridProps {
  // setFilters?: any;
  setFilters?: React.Dispatch<React.SetStateAction<IQueryFilter>>;
  filters?: IQueryFilter;
}

const CustomDataGrid = (props: Props) => {
  const { setFilters, filters } = props;
  return (
    <Grid container spacing={0}>
      <Grid item md={12} sx={{ minHeight: "200px" }}>
        <DataGrid
          sx={{
            mt: 4,
            py: 2,
            px: 3,
            backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: 5,
            boxShadow: '0 0 25px rgba(30,30,30,0.3)',
          }}
          autoHeight 
          pageSizeOptions={[ 10, 20, 50, 100]}
          disableColumnMenu
          {...(setFilters && {
            onSortModelChange: (sort) => {
              setFilters((p) => ({
                ...p,
                sortBy: sort[0]?.field ?? undefined,
                sortDir: sort[0]?.sort ?? undefined,
              }));
            },
            onPaginationModelChange: (pagination) =>
              setFilters((filters) => ({ ...filters, pageSize: pagination?.pageSize, pageNo: pagination?.page })),
            paginationMode: "server",
            paginationModel: {
              page: filters?.pageNo || 0,
              pageSize: filters?.pageSize || 10,
            },
            rowCount: filters?.total,
          })}
          {...props}
          slots={{
            toolbar: GridToolbar,
            ...props?.slots,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomDataGrid;
