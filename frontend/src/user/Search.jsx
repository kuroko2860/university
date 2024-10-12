import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Search() {
  const major = new URLSearchParams(window.location.search).get("major");
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [searchMajor, setSearchMajor] = useState(major || "all");
  const [searchQueryByAddress, setSearchQueryByAddress] = useState("");
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [searchQueryByPhone, setSearchQueryByPhone] = useState("");

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
      setUniversities(
        response.data.filter(
          (university) =>
            university.name.includes(searchQueryByName) &&
            university.address.includes(searchQueryByAddress) &&
            university.phone.includes(searchQueryByPhone)
        )
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error searching universities: ", error);
    }
  };
  const fetchUniversities = async () => {
    try {
      const response = await axios.get("/university");
      setUniversities(response.data);
    } catch (error) {
      toast.error("Error fetching universities: " + error.message);
    }
  };
  const handleNavigate = async () => {
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
    fetchUniversities();
    if (major) {
      handleNavigate();
    }
  }, []);

  return (
    <div>
      <form
        className="px-12 py-8 bg-gray-200 m-8 border border-gray-300 border-r-2 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Chuyên ngành
            <select
              value={searchMajor}
              defaultValue={searchMajor}
              onChange={(e) => setSearchMajor(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="all">Chọn chuyên ngành</option>
              {majors &&
                majors.map(({ major_name }) => (
                  <option key={major_name} value={major_name}>
                    {major_name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <br />
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
  const handleLikeClick = async (e, university) => {
    e.stopPropagation();
    if (!user_id) {
      navigate("/login");
      return;
    }
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
  const handleUnlikeClick = async (e, university) => {
    e.stopPropagation();
    if (!user_id) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(`/favorite_list/${user_id}/${university.id}`);
      fetchFavorList();
    } catch (error) {
      console.error("Error unliking university: ", error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 px-[150px]">
      {universities.map((university) => (
        <div
          key={university.id}
          className="bg-white p-4 shadow-lg flex justify-center items-center flex-col shadow-gray-300 border border-gray-300 rounded-md  cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => handleDetailsClick(university)}
        >
          {university.logo ? (
            <img
              src={university.logo}
              alt="University Logo"
              style={{
                width: "200px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          ) : (
            <p>Logo không khả dụng</p>
          )}
          <p className="font-medium leading-tight text-center mt-4">
            {university.name}
          </p>
          <div className="flex justify-center mt-4">
            {!favorList.includes(university.id) ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => handleLikeClick(e, university)}
              >
                Thích
              </button>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => handleUnlikeClick(e, university)}
              >
                Bỏ thích
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
