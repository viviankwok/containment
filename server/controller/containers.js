require("dotenv").config();
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const db = require("../db/queries");
// const { check, validationResult } = require("express-validator");

// TESTING
router.get("/testing", async (req, res) => {
  try {
    res.send("testing route for containers.");
  } catch (error) {
    console.log(error);
    res.json("An error has occurred.");
  }
});

// ROUTES (with root '/containers')
router.get("/all", db.getContainers);
router.post("/create", db.createContainer);
router.patch("/update", db.updateContainer);
router.delete("/delete/:product_code", db.deleteContainer);

module.exports = router;
