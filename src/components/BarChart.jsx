import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../contexts/ContextApi";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const { cookies } = useContext(ThemeContext);
  const [expenses, setExpenses] = useState([]);

  const fetchCategories = async () => {
    const responseCategory = await axios.get(
      `${import.meta.env.VITE_APP_SERVERURL}/api/category`,
      {
        headers: {
          Authorization: `Bearer ${cookies.AuthToken.token}`,
        },
      }
    );

    setCategories(responseCategory.data);
    console.log(responseCategory.data);
    const responseExpenses = await axios.get(
      `${import.meta.env.VITE_APP_SERVERURL}/api/expense`,
      {
        headers: {
          Authorization: `Bearer ${cookies.AuthToken.token}`,
        },
      }
    );
    setExpenses(responseExpenses.data);
    console.log(responseExpenses.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={categories.map((category) => category.category)}
      //   keys={[
      //     "Groceries",
      //     "Fees",
      //     "Utilties (wifi, internet)",
      //     "Fuel costs",
      //     "Public transport",
      //     "Utensils",
      //     "Career devlopment",
      //     "College others",
      //     "Health & recreation",
      //     "College industrial visit expenses",
      //     "Loan/Debt",
      //     "Investment",
      //     "insurance",
      //     "College Fee",
      //     "Public transport",
      //     "Emergency Fund",
      //     "Fast food",
      //     "Entertainment",
      //     "Fuel",
      //     "Fashion",
      //   ]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "month", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in month: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
