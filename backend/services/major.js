const { sql, poolPromise } = require("../db");

async function getAllMajors() {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .query("SELECT distinct major_name FROM majors");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching majors: ", error);
    return [];
  }
}

async function getAllMajorsByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("SELECT * FROM majors WHERE university_id = @university_id");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching majors: ", error);
    return [];
  }
}

async function getMajorById(university_id, id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "SELECT * FROM majors WHERE university_id = @university_id AND major_id = @id"
      );
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching major: ", error);
    return null;
  }
}

async function createMajor(university_id, major) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_name", sql.NVarChar, major.major_name)
      .input("major_quota", sql.Int, major.major_quota)
      .input("university_id", sql.Int, university_id)
      .query(
        "INSERT INTO majors (major_name, major_quota, university_id) VALUES (@major_name, @major_quota, @university_id)"
      );
    return result;
  } catch (error) {
    console.error("Error creating major: ", error);
    return null;
  }
}

async function updateMajor(university_id, id, major) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_name", sql.NVarChar, major.major_name)
      .input("major_quota", sql.Int, major.major_quota)
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "UPDATE majors SET major_name = @major_name, major_quota = @major_quota WHERE major_id = @id"
      );
    console.log(result, major);
    return result;
  } catch (error) {
    console.error("Error updating major: ", error);
    return null;
  }
}

async function deleteMajor(university_id, id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "DELETE FROM majors WHERE university_id = @university_id AND major_id = @id"
      );
    return result;
  } catch (error) {
    console.error("Error deleting major: ", error);
    return null;
  }
}

async function deleteMajorsByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("DELETE FROM majors WHERE university_id = @university_id");
    return result;
  } catch (error) {
    console.error("Error deleting majors by university_id: ", error);
    return null;
  }
}

module.exports = {
  getAllMajorsByUniversityId,
  getMajorById,
  createMajor,
  updateMajor,
  deleteMajor,
  deleteMajorsByUniversityId,
  getAllMajors,
};
