const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");

// Get all searchs
router.get("/:major_id", searchController.getAllSearchesByMajorId);

// Get search by ID
router.get("/:university_id", searchController.getAllSearchesByUniversityId);

// Create a new search
router.post("/", searchController.createSearch);

// Update search by ID
router.put("/:id", searchController.updateSearch);

// Delete search by ID
router.delete("/:id", searchController.deleteSearch);

module.exports = router;
