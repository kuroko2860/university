const statisticService = require("../services/statistic");

async function getMostPopularUniversities(req, res) {
  try {
    const result = await statisticService.getMostPopularUniversities();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getMostPopularMajors(req, res) {
  try {
    const result = await statisticService.getMostPopularMajors();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getMajorRate(req, res) {
  try {
    const { major_name } = req.params;
    const result = await statisticService.getMajorRate(major_name);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getMostPopularUniversities,
  getMostPopularMajors,
  getMajorRate,
};
