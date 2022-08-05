require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// const User = require("../models/User");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

router.get("/testing", async (req, res) => {
  try {
    res.send("testing route for containers.");
  } catch (error) {
    console.log(error);
    res.json("An error has occurred.");
  }
});

module.exports = router;
