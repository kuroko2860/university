const { sql, poolPromise } = require("../db");

async function getAllSearchesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("SELECT * FROM searches WHERE university_id = @university_id");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching searches by university_id: ", error);
    return [];
  }
}

async function getAllSearchesByMajorId(major_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_id", sql.Int, major_id)
      .query("SELECT * FROM searches WHERE major_id = @major_id");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching searches by major_id: ", error);
    return [];
  }
}

async function getCountSearchesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query(
        "SELECT COUNT(*) AS count FROM searches WHERE university_id = @university_id"
      );
    return result.recordset[0].count;
  } catch (error) {
    console.error("Error fetching count of searches by university_id: ", error);
    return 0;
  }
}

async function getCountSearchesByMajorId(major_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_id", sql.Int, major_id)
      .query(
        "SELECT COUNT(*) AS count FROM searches WHERE major_id = @major_id"
      );
    return result.recordset[0].count;
  } catch (error) {
    console.error("Error fetching count of searches by major_id: ", error);
    return 0;
  }
}

async function createSearch(search) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, search.university_id)
      .input("major_id", sql.Int, search.major_id)
      .input("search_time", sql.DateTime, search.search_time)
      .query(
        "INSERT INTO searches (university_id, major_id, search_time) VALUES (@university_id, @major_id, @search_time)"
      );
    return result;
  } catch (error) {
    console.error("Error creating search: ", error);
    return null;
  }
}

async function updateSearch(search_id, newSearch) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("search_id", sql.Int, search_id)
      .input("university_id", sql.Int, newSearch.university_id)
      .input("major_id", sql.Int, newSearch.major_id)
      .input("search_time", sql.DateTime, newSearch.search_time)
      .query(
        "UPDATE searches SET university_id = @university_id, major_id = @major_id, search_time = @search_time WHERE search_id = @search_id"
      );
    return result;
  } catch (error) {
    console.error("Error updating search: ", error);
    return null;
  }
}

async function deleteSearch(search_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("search_id", sql.Int, search_id)
      .query("DELETE FROM searches WHERE search_id = @search_id");
    return result;
  } catch (error) {
    console.error("Error deleting search: ", error);
    return null;
  }
}
async function deleteSearchesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("DELETE FROM searches WHERE university_id = @university_id");
    return result;
  } catch (error) {
    console.error("Error deleting searches by university_id: ", error);
    return null;
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
