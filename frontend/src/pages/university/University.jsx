import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import UniversityForm from "./UniversityForm";
import { Popup } from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useRole";

const University = () => {
  const [searchQueryByAddress, setSearchQueryByAddress] = useState("");
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [searchQueryByPhone, setSearchQueryByPhone] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();
  const isAdmin = useAdmin();
  const fetchUniversities = async () => {
    try {
      const response = await axios.get("/university");
      setAllUniversities(response.data);
      setUniversities(response.data);
    } catch (error) {
      toast.error("Error fetching universities: " + error.message);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);
  useEffect(() => {
    setUniversities(
      allUniversities.filter((university) => {
        return (
          university.address.toString().includes(searchQueryByAddress) &&
          university.name.toString().includes(searchQueryByName) &&
          university.phone.toString().includes(searchQueryByPhone)
        );
      })
    );
  }, [searchQueryByAddress, searchQueryByName, searchQueryByPhone]);

  const handleAddClick = () => {
    setEditingUniversity(null);
    setShowForm(true);
  };

  const handleEditClick = (university) => {
    setEditingUniversity(university);
    setShowForm(true);
  };
  const addSearchUniversity = async (university_id) => {
    try {
      await axios.post("/university_search", {
        university_id,
      });
    } catch (error) {
      console.error("Error adding search university: ", error);
    }
  };

  const handleDetailsClick = (university) => {
    addSearchUniversity(university.id);
    navigate(`/admin/university/${university.id}`);
  };

  const handleSubmit = async (university) => {
    try {
      console.log(university);
      const formData = new FormData();
      formData.append("id", university.id);
      formData.append("name", university.name);
      formData.append("address", university.address);
      formData.append("phone", university.phone);
      formData.append("fax", university.fax);
      formData.append("website", university.website);
      formData.append("email", university.email);
      formData.append("logo", university.logo[0]);
      if (editingUniversity) {
        await axios.put(`/university/${editingUniversity.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/university", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchUniversities();
      setShowForm(false);
      setSearchQueryByAddress("");
      setSearchQueryByName("");
      setSearchQueryByPhone("");
      toast.success("Thêm thông tin thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/university/${id}`);
      setUniversities(universities.filter((u) => u.id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Xóa thất bại: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Danh sách trường</h1>
        {isAdmin && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddClick}
          >
            Thêm trường
          </button>
        )}
        <form className="px-12 py-8">
          <div className="flex justify-between items-center space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tên trường
              <input
                type="text"
                value={searchQueryByName}
                onChange={(e) => setSearchQueryByName(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Số điện thoại
              <input
                type="text"
                value={searchQueryByPhone}
                onChange={(e) => setSearchQueryByPhone(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Địa chỉ
              <input
                type="text"
                value={searchQueryByAddress}
                onChange={(e) => setSearchQueryByAddress(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
          </div>
        </form>
        <table className="table-auto w-full mt-4 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-bold">ID</th>
              <th className="px-4 py-2 font-bold">Tên trường</th>
              <th className="px-4 py-2 font-bold">SĐT</th>
              <th className="px-4 py-2 font-bold">Fax</th>
              <th className="px-4 py-2 font-bold">Email</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {universities.map((university) => (
              <tr key={university.id} className="bg-white hover:bg-gray-100">
                <td className="px-4 py-2 border-t border-b border-gray-300">
                  {university.id}
                </td>
                <td className="px-4 py-2 border-t border-b border-gray-300">
                  {university.name}
                </td>
                <td className="px-4 py-2 border-t border-b border-gray-300">
                  {university.phone}
                </td>
                <td className="px-4 py-2 border-t border-b border-gray-300">
                  {university.fax}
                </td>
                <td className="px-4 py-2 border-t border-b border-gray-300">
                  {university.email}
                </td>
                <td className="px-4 py-2 border-t border-b border-gray-300 flex items-center gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDetailsClick(university)}
                  >
                    Chi tiết
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEditClick(university)}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteClick(university.id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
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
        <UniversityForm
          defaultValue={editingUniversity}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      </Popup>
    </div>
  );
};

export default University;
