import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import ReactContext from "./context/react.context";
import ShowLogout from "./ShowLogout";

export default function TopAppBar(props) {
  const reactCtx = useContext(ReactContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="app-bar">
        <Toolbar>
          <DashboardSharpIcon />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: 1 }}
            onClick={() => {
              props.handleNav("home");
            }}
          >
            <div className="font-black">containment.</div>
          </Typography>
          {/* <Typography
            variant="overline"
            sx={{ fontWeight: "bold", fontSize: 13 }}
          >
            Logout
          </Typography> */}
          auth state here: {JSON.stringify(reactCtx.auth)}
          {reactCtx.auth ? <ShowLogout /> : ""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
