import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import MajorForm from "./MajorForm";
import { Popup } from "reactjs-popup";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useRole";

const Major = () => {
  const { id: universityId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editingMajor, setEditingMajor] = useState(null);
  const [majors, setMajors] = useState([]);
  const isAdmin = useAdmin();

  const fetchMajor = async () => {
    try {
      const response = await axios.get(`/major/${universityId}`);
      setMajors(response.data);
    } catch (error) {
      toast.error("Error fetching majors: " + error.message);
    }
  };

  useEffect(() => {
    fetchMajor();
  }, [universityId]);

  const handleAddClick = () => {
    setEditingMajor(null);
    setShowForm(true);
  };

  const handleEditClick = (Major) => {
    setEditingMajor(Major);
    setShowForm(true);
  };

  const handleSubmit = async (Major) => {
    try {
      if (editingMajor) {
        await axios.put(`/major/${universityId}/${Major.major_id}`, Major);
      } else {
        await axios.post(`/major/${universityId}`, Major);
      }
      fetchMajor();
      setShowForm(false);
      toast.success("Thêm thông tin thành công");
    } catch (error) {
      toast.error("Error submitting Major: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/major/${universityId}/${id}`);
      setMajors(majors.filter((u) => u.major_id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Error deleting Major: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Ngành học</h1>
        {isAdmin && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddClick}
          >
            Thêm ngành
          </button>
        )}
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tên ngành</th>
              <th className="px-4 py-2">Chỉ tiêu</th>
              {isAdmin && <th className="px-4 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {majors.map((Major) => (
              <tr key={Major.major_id}>
                <td className="px-4 py-2">{Major.major_id}</td>
                <td className="px-4 py-2">{Major.major_name}</td>
                {/* <td className="px-4 py-2">{majorGroups[Major.group_id]}</td> */}
                <td className="px-4 py-2">{Major.major_quota}</td>
                {isAdmin && (
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEditClick(Major)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteClick(Major.major_id)}
                    >
                      Xóa
                    </button>
                  </td>
                )}
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
        <MajorForm
          defaultValue={editingMajor || {}}
          // majorGroups={majorGroups}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </Popup>
    </div>
  );
};

export default Major;
