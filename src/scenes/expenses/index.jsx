import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataExpenses } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "freqPerYr",
      headerName: "Frequency per Year",
      flex: 1,
    },
    {
      field: "billLink",
      headerName: "Bill",
      flex: 1,
      renderCell: (params) => <Link to={`/bills/${params.id}`}>View Bill</Link>,
    },
  ];
  return (
    <Box m="20px">
      <Header title="Expenses" subtitle="Your Expenses" />
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
          rows={mockDataExpenses}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Expenses;
