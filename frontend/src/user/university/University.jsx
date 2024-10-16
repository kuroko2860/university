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
      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">Công cụ hữu ích </span>
                  <span className="block text-green-500 xl:inline">
                    Giúp bạn tìm kiếm trường học.
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  Nhanh chóng - dễ dàng - hiệu quả.
                </p>

                <div className="flex items-center justify-center mt-6">
                  <select
                    value={searchMajor}
                    onChange={(e) => setSearchMajor(e.target.value)}
                    className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300"
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
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <img src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
          Trường học nổi bật
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {universities.slice(0, 3).map((university) => (
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
