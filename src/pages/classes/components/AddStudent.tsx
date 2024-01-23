import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";
import { IUser } from "types/user";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ErrorHandler from "components/errorHandler/ErrorHandler";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

type Props = {
  selectedStudent: string[];
  setSelectedStudent: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddStudent = ({ selectedStudent, setSelectedStudent }: Props) => {
  const Auth = useAuth();
  const {
    data: students,
    status: studentsStatus,
    refetch: studentsRefetch,
  } = useQuery({
    queryKey: ["user/get-by-role/student"],
    queryFn: Auth?.getRequest,
    select: (students: IUser[]): IUser[] => students,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <Box sx={{ mt: 2, p: 1 }}>
      <Typography variant="h3">List Of Students</Typography>
      {studentsStatus === "loading" ? (
        <Skeleton height={200} />
      ) : studentsStatus === "error" ? (
        <ErrorHandler onRefetch={studentsRefetch} />
      ) : (
        <FormGroup>
          <Grid container spacing={2}>
            {students?.map((student) => (
              <Grid item xs={6} md={4} lg={3} key={student.uid}>
                <FormControlLabel
                  sx={{ borderRadius: 4, p: 1, pr: 2, border: "1px solid #eaeaea", background: "#fafafa" }}
                  value={student.uid}
                  checked={selectedStudent.includes(student.uid)}
                  control={<Checkbox />}
                  label={`${student.first_name} ${student.last_name}`}
                  onChange={(e) =>
                    setSelectedStudent((p) => {
                      let index = p.findIndex((id) => id === student.uid);
                      if (index > -1) {
                        let temp = [...p];
                        temp.splice(index, 1);
                        return temp;
                      } else return [...p, student.uid];
                    })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      )}
    </Box>
  );
};

export default AddStudent;
