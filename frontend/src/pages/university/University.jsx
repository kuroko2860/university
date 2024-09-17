import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import UniversityForm from "./UniversityForm";
import { Popup } from "reactjs-popup";
import { useNavigate } from "react-router-dom";

const University = () => {
  const [searchQueryById, setSearchQueryById] = useState("");
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [searchQueryByPhone, setSearchQueryByPhone] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();
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
          university.id.toString().includes(searchQueryById) &&
          university.name.toString().includes(searchQueryByName) &&
          university.phone.toString().includes(searchQueryByPhone)
        );
      })
    );
  }, [searchQueryById, searchQueryByName, searchQueryByPhone]);

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
    navigate(`/university/${university.id}`);
  };

  const handleSubmit = async (university) => {
    try {
      if (editingUniversity) {
        await axios.put(`/university/${editingUniversity.id}`, university);
      } else {
        await axios.post("/university", university);
      }
      fetchUniversities();
      setShowForm(false);
      setSearchQueryById("");
      setSearchQueryByName("");
      setSearchQueryByPhone("");
    } catch (error) {
      toast.error("Error submitting university: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/university/${id}`);
      setUniversities(universities.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Error deleting university: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold mb-2">Universities</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add University
        </button>
        <form className="px-12 py-8">
          <div className="flex justify-between items-center space-y-2">
            <label className="text-sm font-medium text-gray-700">
              ID:
              <input
                type="text"
                value={searchQueryById}
                onChange={(e) => setSearchQueryById(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Name:
              <input
                type="text"
                value={searchQueryByName}
                onChange={(e) => setSearchQueryByName(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Phone:
              <input
                type="text"
                value={searchQueryByPhone}
                onChange={(e) => setSearchQueryByPhone(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </label>
          </div>
        </form>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Fax</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.id}>
                <td className="px-4 py-2">{university.id}</td>
                <td className="px-4 py-2">{university.name}</td>
                <td className="px-4 py-2">{university.phone}</td>
                <td className="px-4 py-2">{university.fax}</td>
                <td className="px-4 py-2">{university.email}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDetailsClick(university)}
                  >
                    Detail
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(university)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(university.id)}
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
