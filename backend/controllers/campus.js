const campusService = require("../services/campus");

async function getCampusesByUniversityId(req, res) {
  try {
    const universityId = req.params.university_id;
    const campuses = await campusService.getCampusesByUniversityId(
      universityId
    );
    res.json(campuses);
  } catch (error) {
    console.error("Error getting all Campuses by University ID: ", error);
    res.status(500).send("Server Error");
  }
}

async function getAllCampuses(req, res) {
  try {
    const campuses = await campusService.getAllCampuses();
    res.json(campuses);
  } catch (error) {
    console.error("Error getting all Campuses: ", error);
    res.status(500).send("Server Error");
  }
}

async function getCampusesById(req, res) {
  try {
    const id = req.params.id;
    const campus = await campusService.getCampusesById(id);
    if (!campus) {
      return res.status(404).json({ message: "Campus not found" });
    }
    res.json(campus);
  } catch (error) {
    console.error("Error getting Campus by ID: ", error);
    res.status(500).send("Server Error");
  }
}

async function createCampuses(req, res) {
  try {
    const newCampus = req.body;
    const result = await campusService.createCampuses(newCampus);
    res.json(result);
  } catch (error) {
    console.error("Error creating Campus: ", error);
    res.status(500).send("Server Error");
  }
}

async function updateCampuses(req, res) {
  try {
    const id = req.params.id;
    const updatedCampus = req.body;
    const result = await campusService.updateCampuses(id, updatedCampus);
    if (!result) {
      return res.status(404).json({ message: "Campus not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating Campus: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteCampuses(req, res) {
  try {
    const id = req.params.id;
    const result = await campusService.deleteCampuses(id);
    if (!result) {
      return res.status(404).json({ message: "Campus not found" });
    }
    res.json({ message: "Campus deleted successfully" });
  } catch (error) {
    console.error("Error deleting Campus: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteCampusesByUniversityId(req, res) {
  try {
    const universityId = req.params.university_id;
    const result = await campusService.deleteCampusesByUniversityId(
      universityId
    );
    if (!result) {
      return res.status(404).json({ message: "Campus not found" });
    }
    res.json({ message: "Campus deleted successfully" });
  } catch (error) {
    console.error("Error deleting Campus by University ID: ", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getCampusesByUniversityId,
  getAllCampuses,
  getCampusesById,
  createCampuses,
  updateCampuses,
  deleteCampuses,
  deleteCampusesByUniversityId,
};
