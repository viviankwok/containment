import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CalculateIcon from "@mui/icons-material/Calculate";

const BottomBar = (props) => {
  return (
    <div>
      <BottomNavigation
        showLabels
        value={props.view}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction
          label="Calculate"
          icon={<CalculateIcon />}
          onClick={() => {
            props.handleNav("calculate");
          }}
        />
        <BottomNavigationAction
          label="Containers"
          icon={<InventoryIcon />}
          onClick={() => {
            props.handleNav("containers");
          }}
        />
        <BottomNavigationAction
          label="Spaces"
          icon={<KitchenIcon />}
          onClick={() => {
            props.handleNav("spaces");
          }}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomBar;
