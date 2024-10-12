import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const UserUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [searchMajor, setSearchMajor] = useState("");
  const navigate = useNavigate();
  const [majors, setMajors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate(`/search?major=${searchMajor}`);
    } catch (error) {
      console.error("Error searching universities: ", error);
    }
  };
  const fetchMajors = async () => {
    try {
      const response = await axios.get("/major");
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching major: ", error);
    }
  };
  useEffect(() => {
    fetchMajors();
  }, []);
  const fetchUniversities = async () => {
    try {
      const response = await axios.get("/university");
      setUniversities(response.data);
    } catch (error) {
      toast.error("Error fetching universities: " + error.message);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

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
    navigate(`university/${university.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-slate-300 border border-gray-300 rounded-2xl py-8">
        <h3 className="text-3xl font-bold mb  mb-2 text-center text-gray-700">
          TÌM KIẾM TRƯỜNG HỌC TỐT NHẤT CHO BẠN
        </h3>
        <p className="text-center text-gray-500">
          Nhanh chóng - Chính xác - Đầy đủ những thông tin mà bạn đang cần tìm
          kiếm.
        </p>
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="flex justify-between items-center space-y-2">
            <select
              value={searchMajor}
              onChange={(e) => setSearchMajor(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Chọn chuyên ngành</option>
              {majors &&
                majors.map(({ major_name }) => (
                  <option key={major_name} value={major_name}>
                    {major_name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className=" p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
          Top trường học
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
          {universities.slice(0, 4).map((university) => (
            <UniversityCard
              key={university.id}
              university={university}
              handleDetailsClick={handleDetailsClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const UniversityCard = ({ university, handleDetailsClick }) => {
  return (
    <div
      className="bg-white shadow-lg shadow-gray-300 flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300"
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
            marginBottom: "8px",
          }}
        />
      ) : (
        <p>Logo không khả dụng</p>
      )}
      <p className="font-bold text-gray-700 leading-tight text-center mt-4">
        {university.name}
      </p>
    </div>
  );
};

export default UserUniversity;
