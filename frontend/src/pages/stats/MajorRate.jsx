import { useEffect, useState } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.addFont("arial-normal", "Arial", "normal");
    doc.setFont("Arial");

    doc.text("Danh sách yêu thích", 10, 10);

    // Define table columns and rows
    const tableColumns = [
      "Tên ngành",
      "Tên trường",
      "Chỉ tiêu",
      "Số lượng chọn",
      "Tỉ lệ chọi",
    ];
    const tableRows = majorRate
      ? majorRate.map((major) => [
          major.major_name,
          major.university_name,
          major.major_quota,
          major.total_selects,
          `1 : ${Math.round(major.total_selects / major.major_quota)}`,
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
    doc.save("major-rate.pdf");
  };

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={handlePrint}
      >
        Tải xuống và in
      </button>
      <form
        className="px-12 py-8 bg-gray-300 shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Chọn ngành
            <select
              value={searchMajor}
              onChange={(e) => setSearchMajor(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Chọn ngành</option>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Tìm kiếm
        </button>
      </form>

      <table className="table-auto w-full mt-4 overflow-x-auto border-collapse border border-gray-500 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-500">Tên ngành</th>
            <th className="px-4 py-2 border border-gray-500">Tên trường</th>
            <th className="px-4 py-2 border border-gray-500">Chỉ tiêu</th>
            <th className="px-4 py-2 border border-gray-500">Số lượt chọn</th>
            <th className="px-4 py-2 border border-gray-500">Tỉ lệ chọi</th>
          </tr>
        </thead>
        <tbody>
          {majorRate.map((major, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="px-4 py-2 border border-gray-500">
                {major.major_name}
              </td>
              <td className="px-4 py-2 border border-gray-500">
                {major.university_name}
              </td>
              <td className="px-4 py-2 border border-gray-500">
                {major.major_quota}
              </td>
              <td className="px-4 py-2 border border-gray-500">
                {major.total_selects}
              </td>
              <td className="px-4 py-2 border border-gray-500">
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
