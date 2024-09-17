const express = require("express");
const router = express.Router();
const universityController = require("../controllers/university");

// Get all universitys
router.get("/", universityController.getAllUniversities);

// Get university by ID
router.get("/:id", universityController.getUniversityById);

// Get university by major name
router.get("/major/:major_name", universityController.getUniversityByMajorName);

// Create a new university
router.post("/", universityController.createUniversity);

// Update university by ID
router.put("/:id", universityController.updateUniversity);

// Delete university by ID
router.delete("/:id", universityController.deleteUniversity);

module.exports = router;
