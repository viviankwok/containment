import React, { useState, useEffect } from "react";
import ContainerModal from "./ContainerModal";
import ContainerModalView from "./ContainerModalView";
import ContainerModalRev from "./ContainerModalRev";
import {
  ImageList,
  ImageListItem,
  Typography,
  ImageListItemBar,
} from "@mui/material";
import ReactContext from "./context/react.context";

const Containers = () => {
  const [containers, setContainers] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // container info modal
  const handleOpen = (d) => {
    setOpen(true);
    setModalProduct(d);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  // fetch all containers from db
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
      setContainers(data);
      // setContainers(JSON.stringify(data));
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
        value={{
          open,
          setOpen,
          modalProduct,
          setModalProduct,
          isEditing,
          setIsEditing,
        }}
      >
        <div className="mb-1 grid justify-center">
          <div className="text-2xl font-bold">All containers.</div>
          <div className="text-xs font-light">[ EVERYTHING OUT THERE ]</div>
          isEditing state: {JSON.stringify(isEditing)}
        </div>
        <ContainerModalRev
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          modalProduct={modalProduct}
        />
        <br />

        <ImageList sx={{ width: 1, height: 700 }} cols={5} gap={25}>
          {containers.map((d, i) => (
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
      </ReactContext.Provider>
    </div>
  );
};

export default Containers;
