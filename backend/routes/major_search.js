const express = require("express");
const router = express.Router();
const majorSearchController = require("../controllers/major_search");

// Create a new search
router.post("/", majorSearchController.createSearch);

module.exports = router;
