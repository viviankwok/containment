import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useContext } from "react";
import ReactContext from "./context/react.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ChildModal(props) {
  const reactCtx = useContext(ReactContext);

  const handleClose = () => {
    props.setOpenChild(false);
    reactCtx.setIsCreating(false);
  };

  const discardChanges = () => {
    console.log("discard change btn clicked");
    reactCtx.setOpen(false);
    reactCtx.setIsCreating(false);
  };

  return (
    <div>
      <Modal
        hideBackdrop
        open={props.openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography
            id="child-modal-title"
            variant="overline"
            component="h2"
            align="center"
            sx={{ mb: 2 }}
          >
            [Warning]
          </Typography>
          <div id="child-modal-description" className="flex justify-center">
            All changes made will be lost.
          </div>
          <div className="flex justify-center">Are you sure?</div>
          <br />
          <div className="flex justify-center">
            <Button variant="contained" onClick={handleClose}>
              Back
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              onClick={discardChanges}
              color="warning"
            >
              Discard Changes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
