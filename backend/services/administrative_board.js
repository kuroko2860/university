const { sql, poolPromise } = require("../db");

async function getAdministrativeBoardsByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query(
        "SELECT * FROM administrative_boards WHERE university_id = @university_id"
      );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching administrative_boards: ", error);
    return [];
  }
}

async function getAdministrativeBoardById(university_id, board_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("board_id", sql.Int, board_id)
      .query(
        "SELECT * FROM administrative_boards WHERE university_id = @university_id AND board_id = @board_id"
      );
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching administrative_board: ", error);
    return null;
  }
}

async function createAdministrativeBoard(university_id, board) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("board_name", sql.NVarChar, board.board_name)
      .input("board_position", sql.NVarChar, board.board_position)
      .input("university_id", sql.Int, university_id)
      .query(
        "INSERT INTO administrative_boards (board_name, board_position, university_id) VALUES (@board_name, @board_position, @university_id)"
      );
    return result;
  } catch (error) {
    console.error("Error creating administrative_board: ", error);
    return null;
  }
}

async function updateAdministrativeBoard(university_id, board_id, board) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("board_name", sql.NVarChar, board.board_name)
      .input("board_position", sql.NVarChar, board.board_position)
      .input("university_id", sql.Int, university_id)
      .input("board_id", sql.Int, board_id)
      .query(
        "UPDATE administrative_boards SET board_name = @board_name, board_position = @board_position WHERE university_id = @university_id AND board_id = @board_id"
      );
    return result;
  } catch (error) {
    console.error("Error updating administrative_board: ", error);
    return null;
  }
}

async function deleteAdministrativeBoardByUniversityId(university_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .query(
        "DELETE FROM administrative_boards WHERE university_id = @university_id"
      );
    return result;
  } catch (error) {
    console.error(
      "Error deleting administrative_board by university_id: ",
      error
    );
    return null;
  }
}

async function deleteAdministrativeBoard(university_id, board_id) {
  try {
    let pool = await poolPromise;
    let result = await pool
      .request()
      .input("university_id", sql.Int, university_id)
      .input("board_id", sql.Int, board_id)
      .query(
        "DELETE FROM administrative_boards WHERE university_id = @university_id AND board_id = @board_id"
      );
    return result;
  } catch (error) {
    console.error("Error deleting administrative_board: ", error);
    return null;
  }
}

module.exports = {
  getAdministrativeBoardsByUniversityId,
  getAdministrativeBoardById,
  createAdministrativeBoard,
  updateAdministrativeBoard,
  deleteAdministrativeBoardByUniversityId,
  deleteAdministrativeBoard,
};
