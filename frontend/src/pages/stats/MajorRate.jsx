import { useEffect, useState } from "react";
import axios from "../../config/axios";
function MajorRate() {
  const [majors, setMajors] = useState([]);
  const [searchMajor, setSearchMajor] = useState("");
  const [majorRate, setMajorRate] = useState([]);

  const fetchMajors = async () => {
    try {
      const response = await axios.get("/major");
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching major: ", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/statistic/major_rate/${searchMajor}`);
      setMajorRate(response.data);
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
            Majors:
            <select
              value={searchMajor}
              onChange={(e) => setSearchMajor(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Select major</option>
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
          Search
        </button>
      </form>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Major name</th>
            <th className="px-4 py-2">University name</th>
            <th className="px-4 py-2">Quota</th>
            <th className="px-4 py-2">Total selected</th>
            <th className="px-4 py-2">Rate</th>
          </tr>
        </thead>
        <tbody>
          {majorRate.map((major, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{major.major_name}</td>
              <td className="px-4 py-2">{major.university_name}</td>
              <td className="px-4 py-2">{major.major_quota}</td>
              <td className="px-4 py-2">{major.total_selects}</td>
              <td className="px-4 py-2">
                1 : {Math.round(major.total_selects / major.major_quota)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MajorRate;
