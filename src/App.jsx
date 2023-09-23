import { useState, useContext } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import { ThemeContext } from "./contexts/ContextApi";
import Auth from "./pages/Auth";
import { ContainerStyles } from "../palette";
import { useMode } from "./theme";
import { ColorModeContext } from "./theme";
import { ThemeProvider } from "@emotion/react";
import DashboardRoute from "./pages/DashboardRoute";
import maintheme from '../palette'
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { logged, isLogged } = useContext(ThemeContext);
  const { setCookie, cookies } = useContext(ThemeContext);
  const authToken = cookies.AuthToken
  return (
    <>
      {authToken ? (
        <>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <ContainerStyles>
                <DashboardRoute />
              </ContainerStyles>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </>
      ) : (
        <ThemeProvider theme={maintheme}>
          <Auth />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
