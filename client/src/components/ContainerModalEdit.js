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

  const initProduct = {
    product_code: reactCtx.modalProduct.product_code,
    name: reactCtx.modalProduct.name,
    brand: reactCtx.modalProduct.brand,
    length: reactCtx.modalProduct.length,
    depth: reactCtx.modalProduct.depth,
    height: reactCtx.modalProduct.height,
  };

  const [formData, setFormData] = useState(initProduct);

  // delete confirmation
  const [openChild, setOpenChild] = useState(false);

  // monitor input changes => formData state

  const handleNameInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, name: e.target.value });
  };

  const handleBrandInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, brand: e.target.value });
  };

  const handleLengthInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, length: e.target.value });
  };

  const handleDepthInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, depth: e.target.value });
  };

  const handleHeightInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, height: e.target.value });
  };

  // const handlePriceInput = (e) => {
  //   e.preventDefault();
  //   console.log("handlePriceInput activated");
  //   setFormData({ ...formData, price: e.target.value });
  // };

  // const handleLinkInput = (e) => {
  //   e.preventDefault();
  //   console.log("handleLinkInput activated");
  //   setFormData({ ...formData, link: e.target.value });
  // };

  const handleSave = async () => {
    console.log(`save btn clicked for #${reactCtx.modalProduct.product_code}`);

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
        name: formData.name,
        brand: formData.brand,
        length: formData.length,
        depth: formData.depth,
        height: formData.height,
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

    // close modal
    reactCtx.setOpen(false);
  };

  // discard edit confirmation
  const handleEditBack = () => {
    console.log(`back btn clicked for #`);
    setOpenChild(true);
  };

  return (
    <div>
      {/* //////////////////////////////////////////////////////////////////////// NAME */}
      <Typography align="center">
        <TextField
          label="[NAME]"
          id="outlined-size-small"
          defaultValue={reactCtx.modalProduct.name}
          // value={height}
          onChange={handleNameInput}
          type="text"
          sx={{ width: 300, mb: 2 }}
        />
      </Typography>

      <div className="flex justify-center">
        <img src={reactCtx.modalProduct.img} width="300" height="300" />
      </div>
      <div>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <Typography variant="overline">[brand]</Typography>
          &nbsp;&nbsp;
          {/* //////////////////////////////////////////////////////////////////////// BRAND */}
          <TextField
            // label="height"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.brand}
            size="small"
            sx={{ mb: 2, p: 0 }}
            // value={height}
            onChange={handleBrandInput}
            type="text"
          />
          <br />
          <Typography variant="overline">[size]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* //////////////////////////////////////////////////////////////////////// LENGTH */}
          <TextField
            label="length"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.length}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            onChange={handleLengthInput}
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
          {/* //////////////////////////////////////////////////////////////////////// DEPTH */}
          <TextField
            label="depth"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.depth}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            onChange={handleDepthInput}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          &nbsp;
          {/* //////////////////////////////////////////////////////////////////////// HEIGHT */}
          <TextField
            label="height"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.height}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            onChange={handleHeightInput}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          <br />
          {/* //////////////////////////////////////////////////////////////////////// PRICE */}
          <Typography variant="overline">[price]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="price"
            id="outlined-size-small"
            defaultValue={reactCtx.modalProduct.price}
            size="small"
            sx={{ mb: 2, width: 120 }}
            // value={height}
            // onChange={handlePriceInput}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <br />
          {/* //////////////////////////////////////////////////////////////////////// LINK */}
          <Typography variant="overline">[link]</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            // label="height"
            id="outlined-size-small"
            defaultValue="xxx.com"
            size="small"
            sx={{ p: 0 }}
            // value={height}
            // onChange={handleLinkInput}
            type="text"
            // InputProps={{
            //   endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            // }}
          />
        </Typography>
      </div>
      <br />
      <div className="flex justify-center">
        {/* //////////////////////////////////////////////////////////////////////// BUTTONS */}
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
