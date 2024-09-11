const searchService = require("../services/search");

async function getAllSearchesByUniversityId(req, res) {
  const { university_id } = req.params;
  try {
    const searches = await searchService.getAllSearchesByUniversityId(
      university_id
    );
    res.json(searches);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAllSearchesByMajorId(req, res) {
  const { major_id } = req.params;
  try {
    const searches = await searchService.getAllSearchesByMajorId(major_id);
    res.json(searches);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getCountSearchesByUniversityId(req, res) {
  const { university_id } = req.params;
  try {
    const count = await searchService.getCountSearchesByUniversityId(
      university_id
    );
    res.json({ count });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getCountSearchesByMajorId(req, res) {
  const { major_id } = req.params;
  try {
    const count = await searchService.getCountSearchesByMajorId(major_id);
    res.json({ count });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createSearch(req, res) {
  const search = req.body;
  try {
    const result = await searchService.createSearch(search);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateSearch(req, res) {
  const { id } = req.params;
  const search = req.body;
  try {
    const result = await searchService.updateSearch(id, search);
    if (!result) {
      res.status(404).send("Search not found");
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteSearch(req, res) {
  const { id } = req.params;
  try {
    const result = await searchService.deleteSearch(id);
    if (!result) {
      res.status(404).send("Search not found");
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteSearchesByUniversityId(req, res) {
  const { university_id } = req.params;
  try {
    const result = await searchService.deleteSearchesByUniversityId(
      university_id
    );
    if (!result) {
      res.status(404).send("Searches not found");
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllSearchesByUniversityId,
  getAllSearchesByMajorId,
  getCountSearchesByUniversityId,
  getCountSearchesByMajorId,
  createSearch,
  updateSearch,
  deleteSearch,
  deleteSearchesByUniversityId,
};
