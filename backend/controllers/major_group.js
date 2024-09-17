const majorGroupService = require("../services/major_group");

module.exports = {
  getAllMajorGroups,
  getMajorGroupById,
  getUniversitiesByGroupId,
  createMajorGroup,
  updateMajorGroup,
  deleteMajorGroup,
};

async function getAllMajorGroups(req, res) {
  try {
    const result = await majorGroupService.getAllMajorGroups();
    res.json(result);
  } catch (error) {
    console.error("Error fetching major groups: ", error);
    res.status(500).send("Server Error");
  }
}

async function getMajorGroupById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await majorGroupService.getMajorGroupById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Major group not found" });
    }
  } catch (error) {
    console.error("Error fetching major group by id: ", error);
    res.status(500).send("Server Error");
  }
}

async function getUniversitiesByGroupId(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await majorGroupService.getUniversitiesByGroupId(id);
    res.json(result);
  } catch (error) {
    console.error("Error fetching universities by group id: ", error);
    res.status(500).send("Server Error");
  }
}

async function createMajorGroup(req, res) {
  try {
    const newMajorGroup = req.body;
    const result = await majorGroupService.createMajorGroup(newMajorGroup);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating major group: ", error);
    res.status(500).send("Server Error");
  }
}

async function updateMajorGroup(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedMajorGroup = req.body;
    const result = await majorGroupService.updateMajorGroup(
      id,
      updatedMajorGroup
    );
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Major group updated successfully" });
    } else {
      res.status(404).json({ message: "Major group not found" });
    }
  } catch (error) {
    console.error("Error updating major group: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteMajorGroup(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await majorGroupService.deleteMajorGroup(id);
    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Major group deleted successfully" });
    } else {
      res.status(404).json({ message: "Major group not found" });
    }
  } catch (error) {
    console.error("Error deleting major group: ", error);
    res.status(500).send("Server Error");
  }
}
