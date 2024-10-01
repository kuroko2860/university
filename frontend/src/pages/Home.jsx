import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        WEBSITE HỖ TRỢ TRA CỨU THÔNG TIN CÁC TRƯỜNG ĐẠI HỌC VÀ CAO ĐẲNG VIỆT NAM
      </h1>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Home;
