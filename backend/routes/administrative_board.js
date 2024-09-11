const express = require("express");
const router = express.Router();
const administrative_board = require("../controllers/administrative_board");

// Get all BanGiamHieu for a specific truong
router.get(
  "/:university_id",
  administrative_board.getAdministrativeBoardsByUniversityId
);

// Get a BanGiamHieu by ID for a specific truong
router.get(
  "/:university_id/:id",
  administrative_board.getAdministrativeBoardById
);

// Create a new BanGiamHieu for a specific truong
router.post("/:university_id", administrative_board.createAdministrativeBoard);

// Update a BanGiamHieu by ID for a specific truong
router.put(
  "/:university_id/:id",
  administrative_board.updateAdministrativeBoard
);

// Delete a BanGiamHieu by ID for a specific truong
router.delete(
  "/:university_id/:id",
  administrative_board.deleteAdministrativeBoardByUniversityId
);

module.exports = router;
