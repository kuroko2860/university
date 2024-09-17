const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statistic");

// Get most popular universities
router.get(
  "/popular_universities",
  statisticController.getMostPopularUniversities
);
router.get("/popular_majors", statisticController.getMostPopularMajors);
router.get("/major_rate/:major_name", statisticController.getMajorRate);
module.exports = router;
