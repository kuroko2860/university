const express = require("express");
const router = express.Router();
const universitySearchController = require("../controllers/university_search");

// Create a new search
router.post("/", universitySearchController.createSearch);

module.exports = router;
