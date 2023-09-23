import { useState, useContext } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import { ThemeContext } from "./contexts/ContextApi";
import Auth from "./pages/Auth";
import { ContainerStyles } from "../palette";
import {useMode} from './theme';
import { ColorModeContext } from "./theme";
import { ThemeProvider } from "@emotion/react";
import DashboardRoute from "./pages/DashboardRoute";

function App() {
  const [theme, colorMode] = useMode();
  const {logged, isLogged} = useContext(ThemeContext)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ContainerStyles>
          {logged ? (
            <>
              <DashboardRoute/>
            </>
          ) : (
            <Auth />
          )}
        </ContainerStyles>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
