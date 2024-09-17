import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import AdministrativeBoardForm from "./AdministrativeBoardForm";
import { Popup } from "reactjs-popup";
import { useParams } from "react-router-dom";

const AdministrativeBoard = () => {
  const { id: universityId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editingAdministrativeBoard, setEditingAdministrativeBoard] =
    useState(null);
  const [administrativeBoards, setAdministrativeBoards] = useState([]);

  const fetchAdministrativeBoard = async () => {
    try {
      const response = await axios.get(`/administrative_board/${universityId}`);
      setAdministrativeBoards(response.data);
    } catch (error) {
      toast.error("Error fetching administrativeBoards: " + error.message);
    }
  };
  useEffect(() => {
    fetchAdministrativeBoard();
  }, [universityId]);

  const handleAddClick = () => {
    setEditingAdministrativeBoard(null);
    setShowForm(true);
  };

  const handleEditClick = (AdministrativeBoard) => {
    setEditingAdministrativeBoard(AdministrativeBoard);
    setShowForm(true);
  };

  const handleSubmit = async (AdministrativeBoard) => {
    try {
      if (editingAdministrativeBoard) {
        await axios.put(
          `/administrative_board/${universityId}/${AdministrativeBoard.board_id}`,
          AdministrativeBoard
        );
      } else {
        await axios.post(
          `/administrative_board/${universityId}`,
          AdministrativeBoard
        );
      }
      fetchAdministrativeBoard();
      setShowForm(false);
    } catch (error) {
      toast.error("Error submitting AdministrativeBoard: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/administrative_board/${universityId}/${id}`);
      setAdministrativeBoards(
        administrativeBoards.filter((u) => u.board_id !== id)
      );
    } catch (error) {
      toast.error("Error deleting AdministrativeBoard: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Administrative Boards</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add AdministrativeBoard
        </button>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {administrativeBoards.map((AdministrativeBoard) => (
              <tr key={AdministrativeBoard.administrativeBoard_id}>
                <td className="px-4 py-2">{AdministrativeBoard.board_id}</td>
                <td className="px-4 py-2">{AdministrativeBoard.board_name}</td>
                <td className="px-4 py-2">
                  {AdministrativeBoard.board_position}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(AdministrativeBoard)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      handleDeleteClick(AdministrativeBoard.board_id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Popup
        open={showForm}
        onClose={() => setShowForm(false)}
        className="bg-white rounded-lg p-4"
      >
        <AdministrativeBoardForm
          defaultValue={editingAdministrativeBoard}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </Popup>
    </div>
  );
};

export default AdministrativeBoard;
