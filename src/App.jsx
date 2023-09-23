import { useState, useContext } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import { ThemeContext } from "./contexts/ContextApi";
import Auth from "./pages/Auth";
import { ContainerStyles } from "../palette";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  console.log(logged);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ContainerStyles>
          {logged ? (
            <>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    {/* <Route path="/calendar" element={<Calendar />} /> */}
                    <Route path="/geography" element={<Geography />} />
                  </Routes>
                </main>
              </div>
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
