const { sql, poolPromise } = require("../db");

async function getAllUniversities() {
  try {
    let pool = await poolPromise;
    let result = await pool.request().query("SELECT * FROM universities");
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
    console.error("Error fetching universities: ", error);
    return [];
  }
}

async function getUniversityById(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM universities WHERE id = @id");
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
    return res[0];
    // return result.recordset[0];
  } catch (error) {
    console.error("Error fetching university: ", error);
    return null;
  }
}

async function createUniversity(university, logoBuffer) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, university.id)
      .input("name", sql.NVarChar, university.name)
      .input("address", sql.NVarChar, university.address)
      .input("phone", sql.NVarChar, university.phone)
      .input("fax", sql.NVarChar, university.fax)
      .input("email", sql.NVarChar, university.email)
      .input("website", sql.NVarChar, university.website)
      .input("logo", sql.VarBinary(sql.MAX), logoBuffer)
      .query(
        "INSERT INTO universities (id,name, address, phone, fax, email, website, logo) VALUES (@id,@name, @address, @phone, @fax, @email, @website, @logo)"
      );
    return result;
  } catch (error) {
    console.error("Error creating university: ", error);
    return null;
  }
}

async function updateUniversity(id, university, logoBuffer) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, university.name)
      .input("address", sql.NVarChar, university.address)
      .input("phone", sql.NVarChar, university.phone)
      .input("fax", sql.NVarChar, university.fax)
      .input("email", sql.NVarChar, university.email)
      .input("website", sql.NVarChar, university.website)
      .input("logo", sql.VarBinary(sql.MAX), logoBuffer)
      .query(
        "UPDATE universities SET name = @name, address = @address, phone = @phone, fax = @fax, email = @email, website = @website, logo = @logo WHERE id = @id"
      );
    return result;
  } catch (error) {
    console.error("Error updating university: ", error);
    return null;
  }
}

async function deleteUniversity(id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM universities WHERE id = @id");
    return result;
  } catch (error) {
    console.error("Error deleting university: ", error);
    return null;
  }
}

async function getUniversityByMajorName(major_name) {
  try {
    let pool = await poolPromise;
    let result;
    if (major_name === "all") {
      result = await pool.request().query("SELECT * FROM universities");
    } else {
      result = await pool
        .request()
        .input("major_name", sql.NVarChar, major_name)
        .query(
          "SELECT * FROM universities WHERE id IN (SELECT university_id FROM majors WHERE major_name = @major_name)"
        );
    }
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
    console.error("Error fetching universities: ", error);
    return [];
  }
}

module.exports = {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversityByMajorName,
};
