const { sql, poolPromise } = require("../db");

async function getAllFavoriteLists() {
  try {
    let pool = await poolPromise;
    let result = await pool.request().query("SELECT * FROM favorite_lists");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching all favorite_lists: ", error);
    return [];
  }
}

async function getAllUniversitiesByUserId(user_id) {
  try {
    let pool = await poolPromise;
    let result = await pool.request().input("user_id", sql.Int, user_id).query(`
        SELECT universities.*
        FROM favorite_lists
        INNER JOIN universities ON favorite_lists.university_id = universities.id
        WHERE favorite_lists.user_id = @user_id
      `);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching all universities by user_id: ", error);
    return [];
  }
}

async function createFavoriteList(favoriteList) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("user_id", sql.Int, favoriteList.user_id)
      .input("university_id", sql.Int, favoriteList.university_id)
      .query(
        "INSERT INTO favorite_lists (user_id, university_id) VALUES (@user_id, @university_id)"
      );
    return result;
  } catch (error) {
    console.error("Error creating favorite_list: ", error);
    return null;
  }
}

async function deleteFavoriteList(list_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("list_id", sql.Int, list_id)
      .query("DELETE FROM favorite_lists WHERE list_id = @list_id");
    return result;
  } catch (error) {
    console.error("Error deleting favorite_list: ", error);
    return null;
  }
}

async function deleteFavoriteListByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("DELETE FROM favorite_lists WHERE university_id = @university_id");
    return result;
  } catch (error) {
    console.error("Error deleting favorite_list by university_id: ", error);
    return null;
  }
}

module.exports = {
  getAllFavoriteLists,
  getAllUniversitiesByUserId,
  createFavoriteList,
  deleteFavoriteList,
  deleteFavoriteListByUniversityId,
};
