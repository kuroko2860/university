const {
  getAllMajorsByUniversityId,
  getMajorById,
  createMajor,
  updateMajor,
  deleteMajor,
  deleteMajorsByUniversityId,
} = require("../services/major");

async function getAllMajors(req, res) {
  try {
    const universityId = req.params.universityId;
    const result = await getAllMajorsByUniversityId(universityId);
    res.json(result);
  } catch (error) {
    console.error("Error fetching majors: ", error);
    res.status(500).send("Server Error");
  }
}
async function getMajor(req, res) {
  try {
    const universityId = req.params.universityId;
    const majorId = req.params.majorId;
    const result = await getMajorById(universityId, majorId);
    if (!result) {
      return res.status(404).json({ message: "Major not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching major: ", error);
    res.status(500).send("Server Error");
  }
}

async function createMajor(req, res) {
  try {
    const universityId = req.params.universityId;
    const newMajor = req.body;
    const result = await createMajor(universityId, newMajor);
    res.json(result);
  } catch (error) {
    console.error("Error creating major: ", error);
    res.status(500).send("Server Error");
  }
}

async function updateMajor(req, res) {
  try {
    const universityId = req.params.universityId;
    const majorId = req.params.majorId;
    const updatedMajor = req.body;
    const result = await updateMajor(universityId, majorId, updatedMajor);
    if (!result) {
      return res.status(404).json({ message: "Major not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating major: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteMajor(req, res) {
  try {
    const universityId = req.params.universityId;
    const majorId = req.params.majorId;
    const result = await deleteMajor(universityId, majorId);
    if (!result) {
      return res.status(404).json({ message: "Major not found" });
    }
    res.json({ message: "Major deleted successfully" });
  } catch (error) {
    console.error("Error deleting major: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteMajorsByUniversityId(req, res) {
  try {
    const universityId = req.params.universityId;
    const result = await deleteMajorsByUniversityId(universityId);
    if (!result) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json({ message: "Majors deleted successfully" });
  } catch (error) {
    console.error("Error deleting majors: ", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getAllMajors,
  getMajor,
  createMajor,
  updateMajor,
  deleteMajor,
  deleteMajorsByUniversityId,
};
