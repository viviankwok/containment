import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChildModalEdit from "./ChildModalEdit";
import { useState, useContext } from "react";
import ReactContext from "./context/react.context";
import { TextField, InputAdornment } from "@mui/material";

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

export default function ContainerModalEdit(props) {
  const reactCtx = useContext(ReactContext);

  // delete confirmation
  const [openChild, setOpenChild] = useState(false);

  const handleSave = () => {
    console.log(`save btn clicked for #${reactCtx.modalProduct.product_code}`);
    reactCtx.setOpen(false);
    console.log("fake saved");
    updateData();
  };

  // update container info
  const updateData = async () => {
    console.log("updateData() activated");
    // endpoint URL
    const url = `http://localhost:5001/containers/update`;
    // fetch config
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer" + accessToken,
      },
      body: JSON.stringify({
        product_code: reactCtx.modalProduct.product_code,
        name: reactCtx.modalProduct.name,
        brand: reactCtx.modalProduct.brand,
        length: reactCtx.modalProduct.length,
        depth: reactCtx.modalProduct.depth,
        width: reactCtx.modalProduct.width,
      }),
    };

    // fetch
    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error("Something went wrong - unable to update.");
      }

      const data = await res.json();
      console.log("data fetched from BE: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  // discard edit confirmation
  const handleEditBack = () => {
    console.log(`back btn clicked for #`);
    setOpenChild(true);
  };

  return (
    <div>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        align="center"
        sx={{ mb: 2 }}
      >
        {reactCtx.modalProduct.name} editing
      </Typography>
      <div className="flex justify-center">
        <img src={reactCtx.modalProduct.img} width="300" height="300" />
      </div>
      <div>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <Typography variant="overline">[brand]</Typography>
          &nbsp;&nbsp;
          <TextField
            // label="height"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.brand}
            size="small"
            sx={{ mb: 2, p: 0 }}
            // value={height}
            // onChange={handleHeightInput}
            type="text"
            // InputProps={{
            //   endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            // }}
          />
          <br />
          <Typography variant="overline">[size]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="length"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.length}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            // onChange={handleHeightInput}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ margin: 0, padding: 0 }}>
                  cm
                </InputAdornment>
              ),
            }}
          />
          &nbsp;
          <TextField
            label="depth"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.depth}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            // onChange={handleHeightInput}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          &nbsp;
          <TextField
            label="height"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.height}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            // onChange={handleHeightInput}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          <br />
          <Typography variant="overline">[price]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="price"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.price}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            // onChange={handleHeightInput}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <br />
          <Typography variant="overline">[link]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            // label="height"
            id="outlined-size-small"
            defaultValue="xxx.com"
            size="small"
            sx={{ p: 0 }}
            // value={height}
            // onChange={handleHeightInput}
            type="text"
            // InputProps={{
            //   endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            // }}
          />
        </Typography>
      </div>
      <br />
      <div className="flex justify-center">
        <Button variant="contained" onClick={handleEditBack}>
          Back
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>
      {/* CHILD MODAL STARTS  */}
      <ChildModalEdit
        openChild={openChild}
        setOpenChild={setOpenChild}
        // delData={delData}
      />
      {/* CHILD MODAL ENDS */}
    </div>
  );
}
