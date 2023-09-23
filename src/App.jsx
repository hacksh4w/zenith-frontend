import { useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./pages/Landing";
import { ThemeContext } from "./contexts/ContextApi";
import Auth from "./pages/Auth";
import { ContainerStyles } from "../palette";
function App() {
  const { logged, setLogged } = useContext(ThemeContext);
  console.log(logged)
  return (
      <ContainerStyles>
        {logged ? (
          <>
            <Landing />
          </>
        ) : (
          <Auth />
        )}
      </ContainerStyles>
  );
}

export default App;
