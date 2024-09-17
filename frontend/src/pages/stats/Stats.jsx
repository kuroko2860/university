import { useNavigate } from "react-router-dom";

function Stats() {
  const navigate = useNavigate();
  const handleStockClick = () => {
    // Logic to show stock of medicines
    // Import useNavigate hook at the top of the file

    // Navigate to the Stock page
    navigate("/popular-universities");
  };

  const handleExpiredClick = () => {
    // Logic to show expired medicines
    // Navigate to the Expired page
    navigate("/popular-majors");
  };

  const handleExpiringSoonClick = () => {
    // Logic to show medicines expiring soon
    navigate("/major-rate");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thống kê</h1>
      <button
        onClick={handleStockClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 "
      >
        Xem truong tim kiem nhieu nhat
      </button>
      <button
        onClick={handleExpiredClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Xem nganh hot nhat
      </button>
      <button
        onClick={handleExpiringSoonClick}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Thong ke ti le chon nganh
      </button>
    </div>
  );
}

export default Stats;
