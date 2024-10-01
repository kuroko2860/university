const universityService = require("../services/university");
const majorService = require("../services/major");
const campusService = require("../services/campus");
const administrativeBoardService = require("../services/administrative_board");
const searchService = require("../services/university_search");
const favoriteListService = require("../services/favorite_list");

module.exports = {
  getAllUniversities: async (req, res) => {
    const universities = await universityService.getAllUniversities();
    res.json(universities);
  },
  getUniversityById: async (req, res) => {
    const university = await universityService.getUniversityById(req.params.id);
    res.json(university);
  },
  getUniversityByMajorName: async (req, res) => {
    const universities = await universityService.getUniversityByMajorName(
      req.params.major_name
    );
    res.json(universities);
  },
  createUniversity: async (req, res) => {
    const logoBuffer = req.file ? req.file.buffer : null; // Get the logo file buffer
    const university = await universityService.createUniversity(
      req.body,
      logoBuffer
    );
    res.json(university);
  },
  updateUniversity: async (req, res) => {
    const logoBuffer = req.file ? req.file.buffer : null; // Get the logo file buffer
    const university = await universityService.updateUniversity(
      req.body.id,
      req.body,
      logoBuffer
    );
    res.json(university);
  },
  deleteUniversity: async (req, res) => {
    await majorService.deleteMajorsByUniversityId(req.params.id);
    await campusService.deleteCampusesByUniversityId(req.params.id);
    await administrativeBoardService.deleteAdministrativeBoardByUniversityId(
      req.params.id
    );
    await favoriteListService.deleteFavoriteListByUniversityId(req.params.id);
    await searchService.deleteSearchesByUniversityId(req.params.id);
    const university = await universityService.deleteUniversity(req.params.id);
    res.json(university);
  },
};
