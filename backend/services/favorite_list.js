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
    let res = result.recordset.map((university) => {
      const base64Logo = Buffer.from(university.logo).toString("base64");
      return {
        id: university.id,
        name: university.name,
        address: university.address,
        phone: university.phone,
        fax: university.fax,
        email: university.email,
        website: university.website,
        logo: `data:image/png;base64,${base64Logo}`,
      };
    });
    return res;
    // return result.recordset;
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
      .input("major_name", sql.NVarChar, favoriteList.major_name)
      .input("university_id", sql.Int, favoriteList.university_id)
      .query(
        "INSERT INTO favorite_lists (user_id, university_id, major_name) VALUES (@user_id, @university_id, @major_name)"
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

async function deleteFavoriteListByUniversityAndUserId(user_id, university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("user_id", sql.Int, user_id)
      .query(
        "DELETE FROM favorite_lists WHERE university_id = @university_id AND user_id = @user_id"
      );
    // console.log(result);
    return result;
  } catch (error) {
    console.error(
      "Error deleting favorite_list by university_id and user_id: ",
      error
    );
    return null;
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
