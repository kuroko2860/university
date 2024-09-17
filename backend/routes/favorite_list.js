const express = require("express");
const router = express.Router();
const favorite_listController = require("../controllers/favorite_list");

// Get all danh sach favorite_list
router.get("/", favorite_listController.getAllFavoriteLists);

// Get all truong by user id
router.get("/:user_id", favorite_listController.getAllUniversitiesByUserId);

// Create a new danh sach favorite_list
router.post("/", favorite_listController.createFavoriteList);

// Delete danh sach favorite_list by ID
router.delete("/:id", favorite_listController.deleteFavoriteList);
router.delete(
  "/:user_id/:university_id",
  favorite_listController.deleteFavoriteListByUniversityAndUserId
);

module.exports = router;
