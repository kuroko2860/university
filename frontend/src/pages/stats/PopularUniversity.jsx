import { useEffect, useState } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.addFont("arial-normal", "Arial", "normal");
    doc.setFont("Arial");

    doc.text("Danh sách trường phổ biến", 10, 10);

    // Define table columns and rows
    const tableColumns = [
      "ID",
      "Tên trường",
      "SĐT",
      "Fax",
      "Email",
      "Số lượt tìm kiếm",
    ];
    const tableRows = popularUniversities
      ? popularUniversities.map((university) => [
          university.id,
          university.name,
          university.phone,
          university.fax,
          university.email,
          university.search_count,
        ])
      : [];

    // Add table to PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
      styles: {
        font: "arial",
        fontSize: 10,
      },
    });

    // Save the PDF
    doc.save("popular-university.pdf");
  };

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Tải xuống và in
      </button>
      <table className="table-auto w-full mt-4 shadow-md rounded-md border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-400">
            <th className="px-4 py-2 font-semibold">ID</th>
            <th className="px-4 py-2 font-semibold">Tên trường</th>
            <th className="px-4 py-2 font-semibold">SĐT</th>
            <th className="px-4 py-2 font-semibold">Fax</th>
            <th className="px-4 py-2 font-semibold">Email</th>
            <th className="px-4 py-2 font-semibold">Số lượt tìm kiếm</th>
          </tr>
        </thead>
        <tbody>
          {popularUniversities.map((university) => (
            <tr key={university.id} className="hover:bg-gray-100">
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
