import { useEffect, useState } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Danh sách nganh pho bien", 10, 10);

    // Define table columns and rows
    const tableColumns = ["ID", "Tên ngành", "Số lượt tìm kiếm"];
    const tableRows = popularMajors
      ? popularMajors.map((major) => [
          major.major_id,
          major.major_name,
          major.search_count,
        ])
      : [];

    // Add table to PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("popular-major.pdf");
  };

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Tải xuống và in
      </button>
      <table className="table-auto w-full mt-4 shadow-lg rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Tên ngành</th>
            <th className="px-6 py-3">Số lượt tìm kiếm</th>
          </tr>
        </thead>
        <tbody>
          {popularMajors.map((major) => (
            <tr key={major.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-6 py-4">{major.major_id}</td>
              <td className="px-6 py-4">{major.major_name}</td>
              <td className="px-6 py-4">{major.search_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopularMajor;
