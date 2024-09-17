import { useEffect, useState } from "react";
import axios from "../../config/axios";

function PopularUniversity() {
  const [popularUniversities, setPopularUniversities] = useState([]);

  const fetchPopularUniversities = async () => {
    try {
      const response = await axios.get("statistic/popular_universities");
      setPopularUniversities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPopularUniversities();
  }, []);

  return (
    <div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Fax</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Search count</th>
          </tr>
        </thead>
        <tbody>
          {popularUniversities.map((university) => (
            <tr key={university.id}>
              <td className="px-4 py-2">{university.id}</td>
              <td className="px-4 py-2">{university.name}</td>
              <td className="px-4 py-2">{university.phone}</td>
              <td className="px-4 py-2">{university.fax}</td>
              <td className="px-4 py-2">{university.email}</td>
              <td className="px-4 py-2">{university.search_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularUniversity;
