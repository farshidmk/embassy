import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { useAuth } from "hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onView?: (record: any) => void;
};

const TableActions: React.FC<Props> = ({ onEdit, onDelete, onView }) => {
  return (
    <Box>
      {onView && (
        <IconButton onClick={onView} color="primary">
          <VisibilityOutlinedIcon />
        </IconButton>
      )}
      {onEdit && (
        <IconButton onClick={onEdit} color="info">
          <EditOutlinedIcon />
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={onDelete} color="error">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default TableActions;

type TableProps = {
  deleteApi: string;
  id: string | number;
  itemName?: string;
};

export const TableDeleteEditAction: React.FC<TableProps> = ({ deleteApi, id, itemName }) => {
  const Auth = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: Auth?.serverCall,
  });
  return (
    <>
      <DeleteDialog
        handleClose={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        message={`Are you sure to delete ${itemName ?? ""}?`}
        handleDelete={() =>
          mutate({
            method: "delete",
            entity: deleteApi,
          })
        }
        title={"Delete Item"}
        isLoading={isLoading}
      />
      <Box>
        <IconButton onClick={() => navigate(`${id}`)} color="info">
          <EditOutlinedIcon />
        </IconButton>

        <IconButton onClick={() => setShowDeleteModal(true)} color="error">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
};

interface MyComponentProps<T> {
  data: T;
  onClick: (item: T) => void;
}

function MyComponent<T>(props: MyComponentProps<T>) {
  // Component implementation
  return <h1>test</h1>;
}

// Usage
<MyComponent<number> data={42} onClick={(value) => console.log(value)} />;

export const ACTION_COLUMN = {
  field: "action",
  headerName: "Action",
  flex: 1,
  sortable: false,
  hideable: false,
  filterable: false,
  // renderCell: ({ value }) => (
  //   <Box component="div" onClick={() => setSelectedTimeSpan(value)} sx={{ cursor: "pointer" }}>
  //     view time span
  //   </Box>
  // ),
};
