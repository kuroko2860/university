import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import MajorGroupForm from "./MajorGroupForm";
import { Popup } from "reactjs-popup";

const MajorGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMajorGroup, setEditingMajorGroup] = useState(null);
  const [majorGroups, setMajorGroups] = useState([]);

  const fetchMajorGroup = async () => {
    try {
      const response = await axios.get(`/major_group`);
      setMajorGroups(response.data);
    } catch (error) {
      toast.error("Error fetching majorGroups: " + error.message);
    }
  };
  useEffect(() => {
    fetchMajorGroup();
  }, []);

  const handleAddClick = () => {
    setEditingMajorGroup(null);
    setShowForm(true);
  };

  const handleEditClick = (MajorGroup) => {
    setEditingMajorGroup(MajorGroup);
    setShowForm(true);
  };

  const handleSubmit = async (MajorGroup) => {
    try {
      if (editingMajorGroup) {
        await axios.put(`/major_group/${MajorGroup.id}`, MajorGroup);
      } else {
        await axios.post(`/major_group`, MajorGroup);
      }
      fetchMajorGroup();
      setShowForm(false);
    } catch (error) {
      toast.error("Error submitting MajorGroup: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/major_group/${id}`);
      setMajorGroups(majorGroups.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Error deleting MajorGroup: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Major Groups</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add Major Group
        </button>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {majorGroups.map((MajorGroup) => (
              <tr key={MajorGroup.id}>
                <td className="px-4 py-2">{MajorGroup.id}</td>
                <td className="px-4 py-2">{MajorGroup.name}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(MajorGroup)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(MajorGroup.id)}
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
        <MajorGroupForm
          defaultValue={editingMajorGroup}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </Popup>
    </div>
  );
};

export default MajorGroup;
