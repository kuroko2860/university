const express = require("express");
const router = express.Router();
const universityController = require("../controllers/university");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Get all universitys
router.get("/", universityController.getAllUniversities);

// Get university by ID
router.get("/:id", universityController.getUniversityById);

// Get university by major name
router.get("/major/:major_name", universityController.getUniversityByMajorName);

// Create a new university
router.post("/", upload.single("logo"), universityController.createUniversity);

// Update university by ID
router.put(
  "/:id",
  upload.single("logo"),
  universityController.updateUniversity
);

// Delete university by ID
router.delete("/:id", universityController.deleteUniversity);

module.exports = router;
