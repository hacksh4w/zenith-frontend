import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataGoals } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";
import Plus from "../../utils/Plus";
import { ContainerStyles } from "../../../palette";

const Goals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [income, setIncome] = useState(0);
  const [goal, setGoal] = useState({});
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Label",
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "total_amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "completed_amount",
      headerName: "Completed Amount",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header title="Goals" subtitle="Your Goals" />
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#43b1b6",
          "&:hover": {
            backgroundColor: "#43b1b6",
          },
          textTransform: "none",
          margin: "10px 10px",
        }}
      >
        <Typography
          sx={{ fontSize: "1rem", color: "white", padding: "0 10px" }}
        >
          Add Goal
        </Typography>
        <Plus />
      </Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataGoals}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <CustomModal isOpen={isOpen} setOpen={setOpen}>
        <ContainerStyles
          sx={{
            minWidth: { xs: "95vw", sm: "85vw", md: "75vw" },
            minHeight: "75vh",
          }}
        ></ContainerStyles>
      </CustomModal>
    </Box>
  );
};

export default Goals;
