const favoriteListService = require("../services/favorite_list");

async function getAllFavoriteLists(req, res) {
  try {
    const favorite_lists = await favoriteListService.getAllFavoriteLists();
    res.json(favorite_lists);
  } catch (error) {
    console.error("Error fetching all favorite lists: ", error);
    res.status(500).send("Server Error");
  }
}

async function getAllUniversitiesByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const universities = await favoriteListService.getAllUniversitiesByUserId(
      user_id
    );
    res.json(universities);
  } catch (error) {
    console.error("Error fetching all universities by user_id: ", error);
    res.status(500).send("Server Error");
  }
}

async function createFavoriteList(req, res) {
  const favorite_list = req.body;
  try {
    const result = await favoriteListService.createFavoriteList(favorite_list);
    res.json(result);
  } catch (error) {
    console.error("Error creating favorite list: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteFavoriteList(req, res) {
  const { favorite_list_id } = req.params;
  try {
    const result = await favoriteListService.deleteFavoriteList(
      favorite_list_id
    );
    if (!result) {
      return res.status(404).json({ message: "Favorite list not found" });
    }
    res.json({ message: "Favorite list deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite list: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteFavoriteListByUniversityId(req, res) {
  const { university_id } = req.params;
  try {
    const result = await favoriteListService.deleteFavoriteListByUniversityId(
      university_id
    );
    if (!result) {
      return res.status(404).json({ message: "Favorite list not found" });
    }
    res.json({ message: "Favorite list deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite list by university id: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteFavoriteListByUniversityAndUserId(req, res) {
  const { user_id, university_id } = req.params;
  try {
    const result =
      await favoriteListService.deleteFavoriteListByUniversityAndUserId(
        user_id,
        university_id
      );
    if (!result) {
      return res.status(404).json({ message: "Favorite list not found" });
    }
    res.json({ message: "Favorite list deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting favorite list by university and user id: ",
      error
    );
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getAllFavoriteLists,
  getAllUniversitiesByUserId,
  createFavoriteList,
  deleteFavoriteList,
  deleteFavoriteListByUniversityId,
  deleteFavoriteListByUniversityAndUserId,
};
