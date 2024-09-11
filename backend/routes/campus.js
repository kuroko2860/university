const express = require("express");
const router = express.Router();
const campusController = require("../controllers/campus");

// Get all campuss for a specific truong
router.get("/:university_id", campusController.getCampusesByUniversityId);

// Get a campus by ID for a specific truong
router.get("/:university_id/:id", campusController.getCampusesById);

// Create a new campus for a specific truong
router.post("/:university_id", campusController.createCampuses);

// Update a campus by ID for a specific truong
router.put("/:university_id/:id", campusController.updateCampuses);

// Delete a campus by ID for a specific truong
router.delete(
  "/:university_id/:id",
  campusController.deleteCampusesByUniversityId
);

module.exports = router;
