import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Favourite() {
  const user_id = localStorage.getItem("user_id");
  const [favorList, setFavorList] = useState([]);
  const [universities, setUniversities] = useState([]);
  const fetchFavorList = async () => {
    try {
      const response = await axios.get(`/favorite_list/${user_id}`);
      setUniversities(response.data);
      setFavorList(response.data.map((item) => item.id));
    } catch (error) {
      console.error("Error fetching favorite list: ", error);
    }
  };
  useEffect(() => {
    fetchFavorList();
  }, [user_id]);

  const navigate = useNavigate();
  const handleDetailsClick = (university) => {
    navigate(`/university/${university.id}`);
  };
  const handleLikeClick = async (university) => {
    try {
      await axios.post("/favorite_list", {
        user_id,
        university_id: university.id,
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
  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Danh sách yêu thích", 10, 10);

    // Define table columns and rows
    const tableColumns = ["ID", "Tên", "SĐT", "Fax", "Email"];
    const tableRows = favorList
      ? universities
          .filter((university) => favorList.includes(university.id))
          .map((university) => [
            university.id,
            university.name,
            university.phone,
            university.fax,
            university.email,
          ])
      : [];

    // Add table to PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("fav-university.pdf");
  };
  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Tải xuống và in
      </button>

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
    </div>
  );
}

export default Favourite;
