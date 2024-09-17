const { sql, poolPromise } = require("../db");

async function getAllMajorGroups() {
  try {
    let pool = await poolPromise;
    let result = await pool.request().query("SELECT * FROM major_groups");
    return result.recordset;
  } catch (error) {
    console.error("Error getting all major groups: ", error);
    return null;
  }
}

async function getMajorGroupById(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM major_groups WHERE id = @id");
    return result.recordset[0];
  } catch (error) {
    console.error("Error getting major group by id: ", error);
    return null;
  }
}

async function getUniversitiesByGroupId(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT * FROM universities WHERE id IN (SELECT university_id FROM majors WHERE group_id = @id)"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error getting universities by group id: ", error);
    return null;
  }
}

async function createMajorGroup(group) {
  try {
    let pool = await poolPromise;

    let result = await pool
      .request()
      .input("name", sql.NVarChar, group.name)
      .query("INSERT INTO major_groups (name) VALUES (@name)");
    return result;
  } catch (error) {
    console.error("Error creating major group: ", error);
    return null;
  }
}

async function updateMajorGroup(id, group) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, group.name)
      .query("UPDATE major_groups SET name = @name WHERE id = @id");
    return result;
  } catch (error) {
    console.error("Error updating major group: ", error);
    return null;
  }
}

async function deleteMajorGroup(id) {
  try {
    let pool = await poolPromise;

    // Delete all majors associated with the major group
    await pool
      .request()
      .input("group_id", sql.Int, id)
      .query("DELETE FROM majors WHERE group_id = @group_id");
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM major_groups WHERE id = @id");
    return result;
  } catch (error) {
    console.error("Error deleting major group: ", error);
    return null;
  }
}

module.exports = {
  getAllMajorGroups,
  getMajorGroupById,
  getUniversitiesByGroupId,
  createMajorGroup,
  updateMajorGroup,
  deleteMajorGroup,
};
