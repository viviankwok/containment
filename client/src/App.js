import React, { useState } from "react";
import Main from "./components/Main";

import Containers from "./components/Containers";
import Spaces from "./components/Spaces";
import Calculate from "./components/Calculate";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopAppBar from "./components/TopAppBar";
import BottomBar from "./components/BottomBar";

const App = () => {
  // mui theming
  const theme = createTheme({
    typography: {
      fontFamily: ["Playfair Display"],
    },
    palette: {
      // mode: "dark",
      secondary: {
        main: "#bdbdbd",
      },
      primary: {
        main: "#efebe9",
      },
    },
  });

  // handle nav
  const [view, setView] = useState("home");
  const handleNav = (item) => {
    console.log(`${item} clicked`);
    setView(item);
  };

  return (
    <div id="app" className="h-screen">
      <ThemeProvider theme={theme}>
        <TopAppBar handleNav={handleNav} />
        <div id="content" className="p-6 px-12 pb-24 h-full">
          {view === "home" ? <Main /> : ""}
          {view === "calculate" ? <Calculate /> : ""}
          {view === "containers" ? <Containers /> : ""}
          {view === "spaces" ? <Spaces /> : ""}
        </div>
        <BottomBar handleNav={handleNav} view={view} />
      </ThemeProvider>
    </div>
  );
};

export default App;
