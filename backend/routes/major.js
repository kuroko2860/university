const express = require("express");
const router = express.Router();
const majorController = require("../controllers/major");

// Get all major for a specific truong
router.get("/:university_id", majorController.getAllMajors);

// Get a major by ID for a specific truong
router.get("/:university_id/:id", majorController.getMajor);

// Create a new major for a specific truong
router.post("/:university_id", majorController.createMajor);

// Update a major by ID for a specific truong
router.put("/:university_id/:id", majorController.updateMajor);

// Delete a major by ID for a specific truong
router.delete("/:university_id/:id", majorController.deleteMajor);

module.exports = router;
