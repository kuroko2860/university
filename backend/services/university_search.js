const { sql, poolPromise } = require("../db");

async function createSearch(search) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, search.university_id)
      .query(
        "INSERT INTO university_searches (university_id) VALUES (@university_id)"
      );
    return result;
  } catch (error) {
    console.error("Error creating search: ", error);
    return null;
  }
}

async function deleteSearchesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .query(
        "DELETE FROM university_searches WHERE university_id = " + university_id
      );
    return result;
  } catch (error) {
    console.error("Error deleting searches: ", error);
    return null;
  }
}

module.exports = {
  createSearch,
  deleteSearchesByUniversityId,
};
