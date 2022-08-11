import React, { useState, useContext } from "react";
import Main from "./components/Main";
import ReactContext from "./components/context/react.context";

import Containers from "./components/Containers";
import Spaces from "./components/Spaces";
import Calculate from "./components/Calculate";
import SignIn from "./components/SignIn";

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

  // monitor auth
  const [auth, setAuth] = useState(true);

  // handle nav
  const [view, setView] = useState("home");
  const handleNav = (item) => {
    console.log(`${item} clicked`);
    setView(item);
  };

  return (
    <div id="app" className="h-screen">
      <ReactContext.Provider
        value={{
          auth,
          setAuth,
        }}
      >
        <ThemeProvider theme={theme}>
          <TopAppBar handleNav={handleNav} />
          <div id="content" className="p-6 px-12 pb-24 h-full">
            {auth ? (
              view === "home" ? (
                <Main />
              ) : view === "calculate" ? (
                <Calculate />
              ) : view === "containers" ? (
                <Containers />
              ) : (
                <Spaces />
              )
            ) : (
              <SignIn />
            )}
          </div>
          <BottomBar handleNav={handleNav} view={view} />
        </ThemeProvider>
      </ReactContext.Provider>
    </div>
  );
};

export default App;
