import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpaceModalChild from "./SpaceModalChild";
import { useState, useContext } from "react";
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
  p: 4,
};

export default function SpaceModal(props) {
  const reactCtx = useContext(ReactContext);

  // delete confirmation
  const [openChild, setOpenChild] = useState(false);
  const handleDelete = () => {
    console.log(`delete btn clicked for product #${reactCtx.modalSpace.id}`);
    setOpenChild(true);
  };

  // delete from db
  const delData = async () => {
    // endpoint URL
    const url = `http://localhost:5001/spaces/delete/${reactCtx.modalSpace.id}`;
    // fetch config
    const config = {
      method: "DELETE",
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
        throw new Error("Something went wrong - unable to delete.");
      }

      const data = await res.json();
      console.log("data fetched from BE: ", data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{ mb: 2 }}
            >
              {reactCtx.modalSpace.name}
            </Typography>
            <div className="flex justify-center">
              <img src={reactCtx.modalSpace.img} width="300" height="300" />
            </div>
            <div>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Typography variant="overline">
                  <span className="uppercase">[location]</span>
                </Typography>
                &nbsp;
                <span className="uppercase">
                  {reactCtx.modalSpace.location}
                </span>
                <br />
                <Typography variant="overline">[size]</Typography>&nbsp;
                {reactCtx.modalSpace.length} (L) ?? {reactCtx.modalSpace.depth}{" "}
                (D) ?? {reactCtx.modalSpace.height} (H) cm
                <br />
                <Typography variant="overline">[qty]</Typography>{" "}
                {reactCtx.modalSpace.qty}
              </Typography>
            </div>
            <br />
            <div className="flex justify-center">
              {/* <Button variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp; */}
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            {/* CHILD MODAL STARTS  */}
            <SpaceModalChild
              openChild={openChild}
              setOpenChild={setOpenChild}
              delData={delData}
            />
            {/* CHILD MODAL ENDS */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
