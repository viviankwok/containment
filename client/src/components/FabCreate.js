import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import ReactContext from "./context/react.context";

export default function FabCreate() {
  const reactCtx = useContext(ReactContext);

  const handleCreate = () => {
    reactCtx.setModalProduct("");
    reactCtx.setOpen(true);
    reactCtx.setIsCreating(true);
  };

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  return (
    <Box sx={{ ...fabStyle }}>
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        onClick={handleCreate}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
