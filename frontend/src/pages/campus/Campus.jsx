import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import CampusForm from "./CampusForm";
import { Popup } from "reactjs-popup";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useRole";

const Campus = () => {
  const { id: universityId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);
  const [campuses, setCampuses] = useState([]);
  const isAdmin = useAdmin();

  const fetchCampuses = async () => {
    try {
      const response = await axios.get(`/campus/${universityId}`);
      setCampuses(response.data);
    } catch (error) {
      toast.error("Error fetching campuses: " + error.message);
    }
  };
  useEffect(() => {
    fetchCampuses();
  }, [universityId]);

  const handleAddClick = () => {
    setEditingCampus(null);
    setShowForm(true);
  };

  const handleEditClick = (Campus) => {
    setEditingCampus(Campus);
    setShowForm(true);
  };

  const handleSubmit = async (Campus) => {
    try {
      if (editingCampus) {
        await axios.put(`/campus/${universityId}/${Campus.campus_id}`, Campus);
      } else {
        await axios.post(`/campus/${universityId}`, Campus);
      }
      fetchCampuses();
      setShowForm(false);
      toast.success("Thêm thông tin thành công");
    } catch (error) {
      toast.error("Error submitting Campus: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/campus/${universityId}/${id}`);
      setCampuses(campuses.filter((u) => u.campus_id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Error deleting Campus: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Cơ sở</h1>
        {isAdmin && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddClick}
          >
            Thêm cơ sở
          </button>
        )}
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Địa chỉ</th>
              {isAdmin && <th className="px-4 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {campuses.map((Campus) => (
              <tr key={Campus.campus_id}>
                <td className="px-4 py-2">{Campus.campus_id}</td>
                <td className="px-4 py-2">{Campus.campus_name}</td>
                <td className="px-4 py-2">{Campus.campus_address}</td>
                {isAdmin && (
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEditClick(Campus)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteClick(Campus.campus_id)}
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
        <CampusForm
          defaultValue={editingCampus}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </Popup>
    </div>
  );
};

export default Campus;
