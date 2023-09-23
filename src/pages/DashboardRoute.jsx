import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Expenses from "../scenes/expenses";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
// import Calendar from "./../scenes/calendar/calendar";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Goals from "../scenes/goals";

const DashboardRoute = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <CssBaseline />
      <div className="app">
        <main className="content flex-row">
          <Sidebar isSidebar={isSidebar} />
          <div className="flex-col">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/expenseratio" element={<Pie />} />
              <Route path="/income" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/goals" element={<Goals />} />
              {/* <Route path="/calendar" element={<Calendar />} /> */}
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardRoute;
