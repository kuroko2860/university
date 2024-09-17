const administrativeBoardService = require("../services/administrative_board");

async function getAdministrativeBoardsByUniversityId(req, res) {
  try {
    const university_id = req.params.university_id;
    const result =
      await administrativeBoardService.getAdministrativeBoardsByUniversityId(
        university_id
      );
    res.json(result);
  } catch (error) {
    console.error("Error fetching all AdministrativeBoard: ", error);
    res.status(500).send("Server Error");
  }
}

async function getAdministrativeBoardById(req, res) {
  try {
    const university_id = req.params.university_id;
    const administrative_board_id = req.params.administrative_board_id;
    const result = await administrativeBoardService.getAdministrativeBoardById(
      university_id,
      administrative_board_id
    );
    if (!result) {
      return res.status(404).json({ message: "AdministrativeBoard not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching AdministrativeBoard: ", error);
    res.status(500).send("Server Error");
  }
}

async function createAdministrativeBoard(req, res) {
  try {
    const university_id = req.params.university_id;
    const new_administrative_board = req.body;
    const result = await administrativeBoardService.createAdministrativeBoard(
      university_id,
      new_administrative_board
    );
    res.json(result);
  } catch (error) {
    console.error("Error creating AdministrativeBoard: ", error);
    res.status(500).send("Server Error");
  }
}

async function updateAdministrativeBoard(req, res) {
  try {
    const university_id = req.params.university_id;
    const administrative_board_id = req.params.id;
    const updated_administrative_board = req.body;
    const result = await administrativeBoardService.updateAdministrativeBoard(
      university_id,
      administrative_board_id,
      updated_administrative_board
    );
    if (!result) {
      return res.status(404).json({ message: "AdministrativeBoard not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating AdministrativeBoard: ", error);
    res.status(500).send("Server Error");
  }
}

async function deleteAdministrativeBoardByUniversityId(req, res) {
  try {
    const university_id = req.params.university_id;
    const result =
      await administrativeBoardService.deleteAdministrativeBoardByUniversityId(
        university_id
      );
    if (!result) {
      return res.status(404).json({ message: "AdministrativeBoard not found" });
    }
    res.json({ message: "AdministrativeBoard deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting all AdministrativeBoard for a university: ",
      error
    );
    res.status(500).send("Server Error");
  }
}

async function deleteAdministrativeBoard(req, res) {
  try {
    const university_id = req.params.university_id;
    const administrative_board_id = req.params.administrative_board_id;
    const result = await administrativeBoardService.deleteAdministrativeBoard(
      university_id,
      administrative_board_id
    );
    if (!result) {
      return res.status(404).json({ message: "AdministrativeBoard not found" });
    }
    res.json({ message: "AdministrativeBoard deleted successfully" });
  } catch (error) {
    console.error("Error deleting AdministrativeBoard: ", error);
    res.status(500).send("Server Error");
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
