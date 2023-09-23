import { useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ContextApi from "./contexts/ContextApi";
import Landing from "./pages/Landing";
import { ThemeContext } from "./contexts/ContextApi";
import Auth from "./pages/Auth";
import { ContainerStyles } from "../palette";
function App() {
  const { logged, setLogged } = useContext(ThemeContext);
  return (
    <ContextApi>
      <ContainerStyles>
        {logged ? (
          <>
            <Landing />
          </>
        ) : (
          <Auth />
        )}
      </ContainerStyles>
    </ContextApi>
  );
}

export default App;
