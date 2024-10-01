import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [searchMajor, setSearchMajor] = useState("");

  const fetchMajors = async () => {
    try {
      const response = await axios.get("/major");
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching major: ", error);
    }
  };

  const addSearchMajor = async (major_name) => {
    try {
      await axios.post("/major_search", {
        major_name,
      });
    } catch (error) {
      console.error("Error adding search major: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSearchMajor(searchMajor);
      const response = await axios.get(`/university/major/${searchMajor}`);
      setUniversities(response.data);
    } catch (error) {
      console.error("Error searching universities: ", error);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <div>
      <form className="px-12 py-8" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Chuyên ngành:
            <select
              value={searchMajor}
              onChange={(e) => setSearchMajor(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Chọn chuyên ngành</option>
              {majors &&
                majors.map(({ major_name }) => (
                  <option key={major_name} value={major_name}>
                    {major_name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tìm kiếm
        </button>
      </form>
      <Universities universities={universities} searchMajor={searchMajor} />
    </div>
  );
}

const Universities = ({ universities, searchMajor }) => {
  const user_id = localStorage.getItem("user_id");
  const [favorList, setFavorList] = useState([]);
  const fetchFavorList = async () => {
    try {
      const response = await axios.get(`/favorite_list/${user_id}`);
      setFavorList(response.data.map((item) => item.id));
    } catch (error) {
      console.error("Error fetching favorite list: ", error);
    }
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
  useEffect(() => {
    fetchFavorList();
  }, [user_id]);

  const navigate = useNavigate();
  const handleDetailsClick = (university) => {
    addSearchUniversity(university.id);
    navigate(`/university/${university.id}`);
  };
  const handleLikeClick = async (university) => {
    try {
      await axios.post("/favorite_list", {
        user_id,
        university_id: university.id,
        major_name: searchMajor,
      });
      fetchFavorList();
    } catch (error) {
      console.error("Error liking university: ", error);
    }
  };
  const handleUnlikeClick = async (university) => {
    try {
      await axios.delete(`/favorite_list/${user_id}/${university.id}`);
      fetchFavorList();
    } catch (error) {
      console.error("Error unliking university: ", error);
    }
  };
  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Tên trường</th>
          <th className="px-4 py-2">SĐT</th>
          <th className="px-4 py-2">Fax</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2"></th>
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
                Chi tiết
              </button>
              {!favorList.includes(university.id) ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleLikeClick(university)}
                >
                  Thích
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUnlikeClick(university)}
                >
                  Bỏ thích
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Search;
