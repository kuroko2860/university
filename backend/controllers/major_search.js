const majorSearchService = require("../services/major_search");

async function createSearch(req, res) {
  const search = req.body;
  try {
    const result = await majorSearchService.createSearch(search);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createSearch,
};
