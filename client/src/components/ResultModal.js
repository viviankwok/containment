import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChildModal from "./ChildModal";
import { useState, useContext } from "react";
import ReactContext from "./context/react.context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

export default function ResultModal(props) {
  const reactCtx = useContext(ReactContext);

  // delete from db
  const delData = async () => {
    // endpoint URL
    const url = `http://localhost:5001/containers/delete/${reactCtx.modalProduct.product_code}`;
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
              {props.modalProduct.name}
            </Typography>
            <div className="flex justify-center">
              <img src={props.modalProduct.img} width="300" height="300" />
            </div>
            <div>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Typography variant="overline">[brand]</Typography>&nbsp;
                {props.modalProduct.brand}
                <br />
                <Typography variant="overline">[size]</Typography>&nbsp;
                {props.modalProduct.length} (L) ×&nbsp;
                {props.modalProduct.depth} (D) ×&nbsp;
                {props.modalProduct.height} (H) cm
                <br />
                <Typography variant="overline">[price]</Typography> $x
                <br />
                <Typography variant="overline">[link]</Typography> xxx.com
              </Typography>
            </div>
            <br />
            <div className="flex justify-center">
              {/* <Button variant="contained" onClick={props.handleClose}>
                Thank you
              </Button> */}
              <FavoriteBorderIcon />
              {/* <FavoriteIcon /> */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
