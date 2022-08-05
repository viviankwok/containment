import React, { useState } from "react";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Icon } from "@mui/material";

const App = () => {
  const [value, setValue] = useState("testing");

  return (
    <div id="app">
      App component here
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}

        <BottomNavigationAction label="Recents" />
        <BottomNavigationAction label="Favorites" />
        <BottomNavigationAction label="Nearby" />
      </BottomNavigation>
      <NavBar />
      <Main />
    </div>
  );
};

export default App;
