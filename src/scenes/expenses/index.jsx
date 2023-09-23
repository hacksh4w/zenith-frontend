import {
  Autocomplete,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataExpenses } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import React, { useRef, useState } from "react";
import Plus from "../../utils/Plus";
import { ContainerStyles } from "../../../palette";
import FormSample from "../../components/FormSample";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ContextApi";
import { setIn } from "formik";
const Expenses = () => {
  const theme = useTheme();
  const ref1 = useRef();
  const ref0 = useRef();
  const incomeOptions = ["Yes", "No", ""];
  const { setCookie, cookies } = useContext(ThemeContext);
  const authToken = cookies.AuthToken;
  const colors = tokens(theme.palette.mode);
  const [isExpenseOpen, setExpenseOpen] = useState(false);
  const [isIncomeOpen, setIncomeOpen] = useState(false);
  const [categories, setCategories] = useState([""]);
  // const options = [
  //   //needs
  //   "Groceries",
  //   "Fees",
  //   "Utilties (wifi, internet)",
  //   "Fuel costs",
  //   "Public transport",
  //   "Utensils",
  //   "Career devlopment (courses, certifs)",
  //   "college others",
  //   "Health & recreation",
  //   "College industrial visit expenses",
  //   //savings
  //   "Loan/Debt",
  //   "Investment",
  //   "insurance",
  //   "College Fee",
  //   // "Public transport",
  //   "Emergency Fund",
  //   //wants
  //   "Fast food",
  //   "Entertainment",
  //   "Fuel",
  //   "Fashion",
  //   ''
  // ];
  const fetchCategories = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_SERVERURL}/api/category`,
      {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      }
    );
    const temp = response.data.map((value) => value.category);
    setCategories(temp);
    console.log(categories);
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);
  async function handleExpenseSubmit() {
    event.preventDefault();
    const data = {
      category: expense.category,
      title: expense.title,
      amount: expense.amount,
      freq_per_year: expense.frequency,
      timestamp: expense.timestamp,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}/api/expense`,
        { expense: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setExpense({
      category: "",
      title: "",
      amount: "",
      timestamp: "",
      frequency: "",
    });
    handleIncomingData();
    setExpenseOpen(false);
  }
  async function handleIncomeSubmit(e) {
    event.preventDefault();
    const currentDate = new Date().toLocaleDateString();
    const incomeData = {
      stable: income.stability,
      title: income.title,
      amount: income.amount,
      endsOn: income.endsOn,
      date: currentDate,
    };
    console.log(incomeData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}/api/income`,
        { income: incomeData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setIncome({
      title: "",
      amount: "",
      timestamp: "",
      stability: "",
      endsOn: "",
    });
    handleIncomingData();
    setIncomeOpen(false);
  }
  const [expense, setExpense] = useState({
    category: "",
    title: "",
    amount: "",
    timestamp: "",
    frequency: "",
  });
  const [income, setIncome] = useState({
    title: "",
    amount: "",
    timestamp: "",
    stability: "",
    endsOn: "",
  });
  const [data, setData] = useState([]);
  function handleType(e, v, r) {
    const name = ref0.current.getAttribute("name");
    setExpense((preValue) => {
      return {
        ...preValue,
        [name]: v,
      };
    });
  }
  function handleIncomeType(e, v, r) {
    const name = ref1.current.getAttribute("name");
    console.log(r);
    setIncome((preValue) => {
      return {
        ...preValue,
        [name]: v,
      };
    });
  }
  async function handleIncomingData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVERURL}/api/expense`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    handleIncomingData();
  }, []);
  const columns = [
    {
      field: "timestamp",
      headerName: "Date",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "freq_per_year",
      headerName: "Frequency per Year",
      flex: 1,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return params.value == 0 ? "Not Recurring" : params.value;
      },
    },
    {
      field: "billLink",
      headerName: "Bill",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <a href="" className="link" target="_blank" rel="noopener noreferrer">
          View Bill
        </a>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Header title="Expenses" subtitle="Your Expenses" />
      <Button
        onClick={() => setExpenseOpen(true)}
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
          Add Expense
        </Typography>
        <Plus />
      </Button>
      <Button
        onClick={() => setIncomeOpen(true)}
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
          Add Income
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {/* expense */}
      <CustomModal isOpen={isExpenseOpen} setOpen={setExpenseOpen}>
        <ContainerStyles
          sx={{
            minWidth: { xs: "95vw", sm: "85vw", md: "75vw" },
            minHeight: "50vh",
            justifyContent: "center",
            backgroundColor: "#141b2d",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: { xs: "10px", sm: "20px", md: "50px" },
            borderRadius: "20px",
          }}
        >
          <form
            method="post"
            onSubmit={handleExpenseSubmit}
            style={{
              width: "100%",
              height: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <ContainerStyles
              sx={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <ContainerStyles
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Expense Name:
                  </Typography>
                  <FormSample
                    req={true}
                    id="title"
                    label="Expense Name"
                    height="2.5rem"
                    width="25rem"
                    // type="number"
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={expense.title}
                    onChange={setExpense}
                    name="title"
                    margin="0"
                  />
                </ContainerStyles>
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Expense amount:
                  </Typography>
                  <FormSample
                    req={true}
                    id="amount"
                    label="Expense Amount"
                    height="2.5rem"
                    width="25rem"
                    type="number"
                    // ref={ref1}
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={expense.amount}
                    onChange={setExpense}
                    name="amount"
                    margin="0"
                  />
                </ContainerStyles>
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Expense frequency per year:
                  </Typography>
                  <FormSample
                    // req={true}
                    id="amount"
                    label="Expense periodicity"
                    height="2.5rem"
                    width="25rem"
                    type="number"
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={expense.frequency}
                    onChange={setExpense}
                    name="frequency"
                    margin="0"
                  />
                </ContainerStyles>
              </ContainerStyles>
              <ContainerStyles
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Expense Category:
                  </Typography>
                  <Autocomplete
                    value={expense.category}
                    onChange={handleType}
                    id="category"
                    options={categories}
                    ref={ref0}
                    name="category"
                    sx={{ width: "100%", margin: "0", zIndex: "10000" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Your Expense Type"
                        //   InputProps={{
                        //     style: {
                        //       color: 'white',
                        //       fontFamily: 'Montserrat',
                        //     },
                        //   }}
                        InputLabelProps={{
                          style: {
                            color: "#ffffff",
                            fontStyle: "montserrat",
                            zIndex: "10000",
                            fontSize: "0.8rem",
                          },
                        }}
                        // InputProps={{
                        //   style: {
                        //     color: "#ffffff",
                        //     fontStyle: "montserrat",
                        //     fontSize: "1rem",
                        //     zIndex:'10000'
                        //   },
                        // }}
                        sx={{
                          height: "2.5rem",
                          width: "100%",
                          width: { xs: "100%", md: "80%" },
                          "& .MuiOutlinedInput-root": {
                            height: "2.5rem",
                            // backgroundColor: "transparent",
                            color: "white",
                            "& fieldset": {
                              border: "2px solid white",
                              borderRadius: "8px",
                              color: "white",
                            },
                            "&.Mui-focused fieldset": {
                              border: "2px solid white",
                              borderRadius: "8px",
                              color: "white",
                            },
                          },
                          "& .MuiOutlinedInput-root:hover": {
                            "& fieldset": {
                              border: "2px solid white",
                              color: "white",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </ContainerStyles>
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter Date and Time of Purchase:
                  </Typography>
                  <FormSample
                    req={true}
                    id="timestamp"
                    label=""
                    height="2.5rem"
                    width="25rem"
                    type="datetime-local"
                    // ref={ref1}
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={expense.timestamp}
                    onChange={setExpense}
                    name="timestamp"
                    margin="0"
                  />
                </ContainerStyles>
              </ContainerStyles>
            </ContainerStyles>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#43b1b6",
                "&:hover": {
                  backgroundColor: "#43b1b6",
                },
                textTransform: "none",
                width: "10rem",
                height: "3rem",
              }}
            >
              <Typography
                sx={{
                  color: "black.main",
                  fontSize: "1.2rem",
                }}
              >
                Submit
              </Typography>
            </Button>
          </form>
        </ContainerStyles>
      </CustomModal>
      {/* income */}
      <CustomModal isOpen={isIncomeOpen} setOpen={setIncomeOpen}>
        <ContainerStyles
          sx={{
            minWidth: { xs: "95vw", sm: "85vw", md: "75vw" },
            minHeight: "50vh",
            justifyContent: "center",
            backgroundColor: "#141b2d",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: { xs: "10px", sm: "20px", md: "50px" },
            borderRadius: "20px",
          }}
        >
          <form
            method="post"
            onSubmit={handleIncomeSubmit}
            style={{
              width: "100%",
              height: "45vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <ContainerStyles
              sx={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <ContainerStyles
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Income Name:
                  </Typography>
                  <FormSample
                    req={true}
                    id="title"
                    label="Income Name"
                    height="2.5rem"
                    width="25rem"
                    // type="number"
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={income.title}
                    onChange={setIncome}
                    name="title"
                    margin="0"
                  />
                </ContainerStyles>
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter your Income amount:
                  </Typography>
                  <FormSample
                    req={true}
                    id="amount"
                    label="Income Amount"
                    height="2.5rem"
                    width="25rem"
                    type="number"
                    // ref={ref1}
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={income.amount}
                    onChange={setIncome}
                    name="amount"
                    margin="0"
                  />
                </ContainerStyles>
              </ContainerStyles>
              <ContainerStyles
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Is your income stable (Yes/No):
                  </Typography>
                  <Autocomplete
                    value={income.stability}
                    ref={ref1}
                    onChange={handleIncomeType}
                    id="stability"
                    options={incomeOptions}
                    name="stability"
                    sx={{ width: "100%", margin: "0", zIndex: "10000" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Your Expense Type"
                        //   InputProps={{
                        //     style: {
                        //       color: 'white',
                        //       fontFamily: 'Montserrat',
                        //     },
                        //   }}
                        InputLabelProps={{
                          style: {
                            color: "#ffffff",
                            fontStyle: "montserrat",
                            zIndex: "10000",
                            fontSize: "0.8rem",
                          },
                        }}
                        // InputProps={{
                        //   style: {
                        //     color: "#ffffff",
                        //     fontStyle: "montserrat",
                        //     fontSize: "1rem",
                        //     zIndex:'10000'
                        //   },
                        // }}
                        sx={{
                          height: "2.5rem",
                          width: "100%",
                          width: { xs: "100%", md: "80%" },
                          "& .MuiOutlinedInput-root": {
                            height: "2.5rem",
                            // backgroundColor: "transparent",
                            color: "white",
                            "& fieldset": {
                              border: "2px solid white",
                              borderRadius: "8px",
                              color: "white",
                            },
                            "&.Mui-focused fieldset": {
                              border: "2px solid white",
                              borderRadius: "8px",
                              color: "white",
                            },
                          },
                          "& .MuiOutlinedInput-root:hover": {
                            "& fieldset": {
                              border: "2px solid white",
                              color: "white",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </ContainerStyles>
                <ContainerStyles
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "20px 0",
                      fontWeight: "500",
                    }}
                  >
                    Enter Date and Time until Stable income:
                  </Typography>
                  <FormSample
                    req={true}
                    id="timestamp"
                    label=""
                    height="2.5rem"
                    width="25rem"
                    type="date"
                    // ref={ref1}
                    generalcolor={"#fff"}
                    fieldsetbgcolor={"transparent"}
                    fieldsetborder={"2px solid white"}
                    fieldsetborderradius={"5px"}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "#ffffff",
                        fontStyle: "montserrat",
                        fontSize: "1rem",
                      },
                    }}
                    value={income.endsOn}
                    onChange={setIncome}
                    name="endsOn"
                    margin="0"
                  />
                </ContainerStyles>
              </ContainerStyles>
            </ContainerStyles>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#43b1b6",
                "&:hover": {
                  backgroundColor: "#43b1b6",
                },
                textTransform: "none",
                width: "10rem",
                height: "3rem",
              }}
            >
              <Typography
                sx={{
                  color: "black.main",
                  fontSize: "1.2rem",
                }}
              >
                Submit
              </Typography>
            </Button>
          </form>
        </ContainerStyles>
      </CustomModal>
    </Box>
  );
};

export default Expenses;
