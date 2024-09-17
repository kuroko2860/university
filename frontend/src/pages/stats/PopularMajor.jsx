import { useEffect, useState } from "react";
import axios from "../../config/axios";
function PopularMajor() {
  const [popularMajors, setPopularMajors] = useState([]);
  const fetchPopularMajors = async () => {
    try {
      const response = await axios.get("statistic/popular_majors");
      setPopularMajors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularMajors();
  }, []);

  return (
    <div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Search count</th>
          </tr>
        </thead>
        <tbody>
          {popularMajors.map((major) => (
            <tr key={major.id}>
              <td className="px-4 py-2">{major.major_id}</td>
              <td className="px-4 py-2">{major.major_name}</td>
              <td className="px-4 py-2">{major.search_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularMajor;
