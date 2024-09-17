const majorService = require("../services/major");
async function getAllMajors(req, res) {
  try {
    const result = await majorService.getAllMajors();
    res.json(result);
  } catch (error) {
    console.error("Error fetching majors: ", error);
    res.status(500).send("Server Error");
  }
}
async function getAllMajorsByUniversityId(req, res) {
  try {
    const university_id = req.params.university_id;
    const result = await majorService.getAllMajorsByUniversityId(university_id);
    res.json(result);
  } catch (error) {
    console.error("Error fetching majors: ", error);
    res.status(500).send("Server Error");
  }
}
async function getMajor(req, res) {
  try {
    const university_id = req.params.university_id;
    const major_id = req.params.major_id;
    const result = await majorService.getMajorById(university_id, major_id);
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
    const university_id = req.params.university_id;
    const newMajor = req.body;
    const result = await majorService.createMajor(university_id, newMajor);
    res.json(result);
  } catch (error) {
    console.error("Error creating major: ", error);
    res.status(500).send("Server Error");
  }
}

async function updateMajor(req, res) {
  try {
    const university_id = req.params.university_id;
    const major_id = req.params.id;
    const updatedMajor = req.body;
    const result = await majorService.updateMajor(
      university_id,
      major_id,
      updatedMajor
    );
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
    const university_id = req.params.university_id;
    const major_id = req.params.id;
    const result = await majorService.deleteMajor(university_id, major_id);
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
    const university_id = req.params.university_id;
    const result = await majorService.deleteMajorsByUniversityId(university_id);
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
  getAllMajorsByUniversityId,
  getAllMajors,
  getMajor,
  createMajor,
  updateMajor,
  deleteMajor,
  deleteMajorsByUniversityId,
};
