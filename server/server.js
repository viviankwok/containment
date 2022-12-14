// require env
require("dotenv").config();

// set-up express
const express = require("express");
const app = express();
const cors = require("cors");

// connect db
// const connectDB = require("./db/db");
// connectDB(process.env.MONGODB_URI);
// already in "./db/db.js"
// const mongoose = require("mongoose");
// const db = mongoose.connection;

// set-up middleware
// cors
app.use(cors());
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// controllers
const usersController = require("./controller/users");
app.use("/users", usersController);

const containersController = require("./controller/containers.js");
app.use("/containers", containersController);

const spacesController = require("./controller/spaces");
app.use("/spaces", spacesController);

// endpoint
const db = require("./db/queries");
app.post("/calculate", db.calcContainers);
app.put("/user/register", db.registerUser);
app.post("/user/login", db.logIn);

// listen to PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
