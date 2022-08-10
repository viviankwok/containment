import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChildModal from "./ChildModal";
import { useState, useContext } from "react";
import ReactContext from "./context/react.context";

import ContainerModalView from "./ContainerModalView";
import ContainerModalEdit from "./ContainerModalEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ContainerModal(props) {
  const reactCtx = useContext(ReactContext);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            {reactCtx.isEditing ? (
              <ContainerModalEdit />
            ) : (
              <ContainerModalView />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
