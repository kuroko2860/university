const { sql, poolPromise } = require("../db");

async function getAllCampuses(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("SELECT * FROM campuses WHERE university_id = @university_id");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching campuses: ", error);
    return [];
  }
}

async function getCampusesById(university_id, id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "SELECT * FROM campuses WHERE university_id = @university_id AND campus_id = @id"
      );
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching campus: ", error);
    return null;
  }
}

async function createCampuses(university_id, campus) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("campus_name", sql.NVarChar, campus.campus_name)
      .input("campus_address", sql.NVarChar, campus.campus_address)
      .input("university_id", sql.Int, university_id)
      .query(
        "INSERT INTO campuses (campus_name, campus_address, university_id) VALUES (@campus_name, @campus_address, @university_id)"
      );
    return result;
  } catch (error) {
    console.error("Error creating campus: ", error);
    return null;
  }
}

async function updateCampuses(university_id, id, campus) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("campus_name", sql.NVarChar, campus.campus_name)
      .input("campus_address", sql.NVarChar, campus.campus_address)
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "UPDATE campuses SET campus_name = @campus_name, campus_address = @campus_address WHERE university_id = @university_id AND campus_id = @id"
      );
    return result;
  } catch (error) {
    console.error("Error updating campus: ", error);
    return null;
  }
}

async function deleteCampusesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("DELETE FROM campuses WHERE university_id = @university_id");
    return result;
  } catch (error) {
    console.error("Error deleting campus by university_id: ", error);
    return null;
  }
}

async function deleteCampuses(university_id, id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("id", sql.Int, id)
      .query(
        "DELETE FROM campuses WHERE university_id = @university_id AND campus_id = @id"
      );
    return result;
  } catch (error) {
    console.error("Error deleting campus: ", error);
    return null;
  }
}

async function getCampusesByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query("SELECT * FROM campuses WHERE university_id = @university_id");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching campus by university_id: ", error);
    return [];
  }
}

module.exports = {
  getCampusesByUniversityId,
  getAllCampuses,
  getCampusesById,
  createCampuses,
  updateCampuses,
  deleteCampuses,
  deleteCampusesByUniversityId,
};
