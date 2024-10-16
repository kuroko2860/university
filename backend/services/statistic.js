const { sql, poolPromise } = require("../db");

async function getMostPopularUniversities() {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .query(
        "SELECT TOP 10 universities.*, (SELECT COUNT(*) FROM university_searches WHERE university_searches.university_id = universities.id) AS search_count FROM universities ORDER BY search_count DESC"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching universities: ", error);
    return [];
  }
}

async function getMostPopularMajors() {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .query(
        "SELECT distinct TOP 10  majors.major_name, (SELECT COUNT(*) FROM major_searches WHERE major_searches.major_name = majors.major_name) AS search_count FROM majors ORDER BY search_count DESC"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching majors: ", error);
    return [];
  }
}

async function getMajorRate(major_name) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_name", sql.NVarChar, major_name)
      .query(
        "SELECT majors.major_name,majors.major_quota,universities.name as university_name, (select COUNT(user_id) from favorite_lists where favorite_lists.major_name = @major_name) AS total_selects FROM majors INNER JOIN universities ON majors.university_id = universities.id where majors.major_name = @major_name ORDER BY total_selects DESC"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching majors: ", error);
    return [];
  }
}

module.exports = {
  getMostPopularUniversities,
  getMostPopularMajors,
  getMajorRate,
};
