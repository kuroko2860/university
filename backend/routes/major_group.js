const express = require("express");
const router = express.Router();
const majorGroupController = require("../controllers/major_group");

router.get("/", majorGroupController.getAllMajorGroups);
router.get("/:id", majorGroupController.getMajorGroupById);
router.get("/:id/universities", majorGroupController.getUniversitiesByGroupId);
router.post("/", majorGroupController.createMajorGroup);
router.put("/:id", majorGroupController.updateMajorGroup);
router.delete("/:id", majorGroupController.deleteMajorGroup);

module.exports = router;
