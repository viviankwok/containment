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
  width: 600,
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

  const handleConfirmDelete = async () => {
    // DELETE CONTAINER
    const url = `http://localhost:5001/containers/delete/${reactCtx.modalProduct.product_code}`;
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer" + accessToken,
      },
      // body: JSON.stringify("content"),
    };

    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error("Something went wrong - unable to delete.");
      }

      const data = await res.json();
      console.log("data fetched from BE: ", data);
    } catch (error) {
      console.log(error);
    }

    // GET ALL CONTAINERS
    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/containers/all";
      // fetch config
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // authorization: "Bearer" + accessToken,
        },
        // body: JSON.stringify("content"),
      };

      // fetch
      try {
        const res = await fetch(url, config);
        if (res.status !== 200) {
          throw new Error(
            "Something went wrong - msg from FE fetching at Containers.js"
          );
        }

        const data = await res.json();
        console.log("data fetched from BE: ", data);
        reactCtx.setContainers(data);
        // setContainers(JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    // reset states & close modals
    props.setOpenChild(false);
    reactCtx.setOpen(false);
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
            This will delete&nbsp;
            <span className="font-bold uppercase">
              {reactCtx.modalProduct.name}
            </span>
            &nbsp;permanently.
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
              onClick={handleConfirmDelete}
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
