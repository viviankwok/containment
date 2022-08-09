require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../db/queries");
// const { check, validationResult } = require("express-validator");

// TESTING
router.get("/testing", async (req, res) => {
  try {
    res.send("testing route for spaces.");
  } catch (error) {
    console.log(error);
    res.json("An error has occurred.");
  }
});

// ROUTES (with root '/spaces')
router.get("/all", db.getSpaces);
// router.post("/create", db.createContainer);
// router.patch("/update/:product_code", db.updateContainer);
router.delete("/delete/:id", db.deleteSpace);

module.exports = router;
