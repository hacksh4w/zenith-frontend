import { Box, Button, Typography, Slider } from "@mui/material";
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
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ContextApi";
import FormSample from "../../components/FormSample";
import axios from "axios";
const Goals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [income, setIncome] = useState(0);
  const { setCookie, cookies } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const authToken = cookies.AuthToken;
  const [goal, setGoal] = useState({
    title: "",
    amount: 0,
    targetdate: "",
    priority: 0,
    completedAmount: 0,
  });
  function handleSlider(event, newValue) {
    setGoal((preValue) => {
      return {
        ...preValue,
        priority: newValue,
      };
    });
  }
  async function handleGoalSubmit() {
    event.preventDefault();
    try {
      const data = goal;
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}/api/goal`,
        { goal: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      console.log(response);
      setGoal({
        title: "",
        amount: 0,
        targetdate: "",
        priority: 0,
        completedAmount: 0,
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchGoals = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_SERVERURL}/api/goal`,
      {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      }
    );
    const temp = response.data;
    setData(temp);
    console.log(temp);
  };
  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVERURL}/api/stats`,
        {
          headers: {
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchGoals();
    fetchStats();
  }, []);

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   type: "string",
    //   headerAlign: "left",
    //   align: "left",
    //   flex: 0.5,
    // },
    {
      field: "title",
      headerName: "Label",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 2,
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "total_amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "completed_amount",
      headerName: "Completed Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "percentageOfSavings",
      headerName: "Percentage of Savings",
      type: "number",
      headerAlign: "left",
      align: "left",
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <CustomModal isOpen={isOpen} setOpen={setOpen}>
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
            onSubmit={handleGoalSubmit}
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
                    Enter your Goal Name:
                  </Typography>
                  <FormSample
                    req={true}
                    id="title"
                    label="Goal Name"
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
                    value={goal.title}
                    onChange={setGoal}
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
                    Enter your Goal Cost:
                  </Typography>
                  <FormSample
                    req={true}
                    id="cost"
                    label="Goal cost"
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
                    value={goal.amount}
                    onChange={setGoal}
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
                    Enter your Completed Savings Amount (if any):
                  </Typography>
                  <FormSample
                    req={false}
                    id="progress"
                    label="Goal progress"
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
                    value={goal.completedAmount}
                    onChange={setGoal}
                    name="completedAmount"
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
                    Enter your Target Date:
                  </Typography>
                  <FormSample
                    req={true}
                    id="target"
                    label=""
                    height="2.5rem"
                    width="25rem"
                    type="date"
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
                    value={goal.targetDate}
                    onChange={setGoal}
                    name="targetDate"
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
                    Enter your Target Priority {`(${goal.priority})`}:
                  </Typography>
                  <Slider
                    sx={{ color: "white" }}
                    size="small"
                    onChange={handleSlider}
                    valueLabelDisplay="auto"
                    //   aria-label='Small'
                    getAriaValueText={(value) => `${value}/-`}
                    getAriaLabel={() => "Price Range"}
                    step={1}
                    min={1}
                    max={5}
                    defaultValue={1}
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

export default Goals;
