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
  width: 400,
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
  };

  const confirmDelete = (productCode) => {
    props.delData(productCode);
    props.setOpenChild(false);
    reactCtx.setOpen(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        hideBackdrop
        open={props.openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
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
            This will delete
            <span className="font-bold uppercase">
              &nbsp;{reactCtx.modalProduct.name}&nbsp;
            </span>
            permanently.
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
              onClick={() => {
                confirmDelete(reactCtx.modalProduct.product_code);
              }}
              color="warning"
            >
              Delete permanently
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
