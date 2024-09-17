const { sql, poolPromise } = require("../db");

async function createSearch(search) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("major_name", sql.NVarChar, search.major_name)
      .query("INSERT INTO major_searches ( major_name) VALUES ( @major_name)");
    return result;
  } catch (error) {
    console.error("Error creating search: ", error);
    return null;
  }
}

module.exports = {
  createSearch,
};
