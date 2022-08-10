import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  Button,
  TextField,
  Typography,
  ImageList,
  ImageListItem,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import ResultModal from "./ResultModal";

export default function CalculateInput() {
  // collect data from fe
  const [length, setLength] = useState(0);
  const [depth, setDepth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleLengthInput = (e) => {
    setLength(e.target.value);
  };

  const handleDepthInput = (e) => {
    setDepth(e.target.value);
  };

  const handleHeightInput = (e) => {
    setHeight(e.target.value);
  };

  // send data to be
  const [results, setResults] = useState([]);

  const calculate = async () => {
    console.log("calculate fx activated from fe");
    const url = "http://localhost:5001/calculate";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer" + accessToken,
      },
      body: JSON.stringify({
        height: [height],
        depth: [depth],
      }),
    };

    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error("Something went wrong during calculation.");
      }
      // else if (res === "No products matched the search.") {
      //   const data = ["No"];
      // }
      const data = await res.json();
      console.log("data fetched from BE: ", data);
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit btn clicked");
    calculate();

    // useEffect(() => {
    //   calculate();
    // }, []);
  };

  // result info modal
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");

  const handleOpen = (d) => {
    setOpen(true);
    setModalProduct(d);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div id="divider-stack" className="flex justify-center mt-6 p-1">
        <Paper
          elevation={4}
          sx={{
            bgcolor: "#fffffb",
            px: 5,
            py: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                label="length"
                id="outlined-size-small"
                // defaultValue="Small"
                size="small"
                sx={{ width: 100 }}
                value={length}
                onChange={handleLengthInput}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="depth"
                id="outlined-size-small"
                // defaultValue="Small"
                size="small"
                sx={{ width: 100 }}
                value={depth}
                onChange={handleDepthInput}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="height"
                id="outlined-size-small"
                // defaultValue="Small"
                size="small"
                sx={{ width: 100 }}
                value={height}
                onChange={handleHeightInput}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "#a59a96" }}
                // onClick={handleSubmit}
                type="submit"
              >
                go
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
      <ResultModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        modalProduct={modalProduct}
      />
      <div className="flex justify-center">
        <ImageList
          sx={{ width: 9 / 10, height: 600, mt: 2, p: 2 }}
          cols={5}
          rowHeight={121}
          gap={25}
          align="center"
        >
          {results.map((d, i) => (
            <ImageListItem key={d.product_code}>
              <img
                src={`${d.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${d.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={d.name}
                loading="lazy"
                className="rounded-md drop-shadow-md"
                onClick={() => {
                  handleOpen(d);
                }}
              />
              <Typography
                variant="caption"
                align="center"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                {d.name}
                <br />
                <span className="font-normal">by {d.brand}</span>
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}
