import React, { useState, useEffect } from "react";
import SpaceModal from "./SpaceModal";
import {
  ImageList,
  ImageListItem,
  Typography,
  ImageListItemBar,
} from "@mui/material";
import ReactContext from "./context/react.context";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalSpace, setModalSpace] = useState("");

  // container info modal
  const handleOpen = (d) => {
    setOpen(true);
    setModalSpace(d);
  };
  const handleClose = () => setOpen(false);

  // fetch all containers from db
  const getData = async () => {
    // endpoint URL
    const url = "http://localhost:5001/spaces/all";
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
      setSpaces(data);
      // setSpaces(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="containers" className=" justify-center">
      <ReactContext.Provider
        value={{ open, setOpen, modalSpace, setModalSpace }}
      >
        <div className="mb-1 grid justify-center">
          <div className="text-2xl font-bold">All spaces.</div>
          <div className="text-xs font-light">[ EVERYTHING IN HERE ]</div>
        </div>
        <SpaceModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          modalSpace={modalSpace}
        />
        <br />

        <ImageList sx={{ width: 1, height: 700 }} cols={5} gap={25}>
          {spaces.map((d, i) => (
            <ImageListItem key={d.id}>
              <img
                src={`https://i.pinimg.com/736x/08/64/b2/0864b230e833edff45584440e7b05d0b.jpg?w=164&h=164&fit=crop&auto=format`}
                srcSet={`https://i.pinimg.com/736x/08/64/b2/0864b230e833edff45584440e7b05d0b.jpg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
                <span className="font-normal">
                  in <span className="uppercase">{d.location}</span>
                </span>
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      </ReactContext.Provider>
    </div>
  );
};

export default Spaces;
