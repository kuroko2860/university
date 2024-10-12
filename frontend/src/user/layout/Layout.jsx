import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const user_id = localStorage.getItem("user_id");
  //   const user_role = localStorage.getItem("user_role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  return (
    <div>
      <nav className="bg-gray-800 h-16 flex justify-between items-center px-8">
        <ul className="flex">
          <ul className="flex">
            <li className="mr-6">
              <a href="/" className="text-white hover:text-gray-300 text-2xl">
                MANUNIE
              </a>
            </li>
          </ul>
          <ul className="flex">
            <li className="mr-6 flex justify-center items-center">
              <a href="/" className="text-white hover:text-gray-300">
                Trang chủ
              </a>
            </li>
            <li className="mr-6 flex justify-center items-center">
              <a href="/search" className="text-white hover:text-gray-300 ">
                Tìm kiếm
              </a>
            </li>

            {user_id && (
              <li className="mr-6 flex justify-center items-center">
                <a href="/favourite" className="text-white hover:text-gray-300">
                  Yêu thích
                </a>
              </li>
            )}
          </ul>
        </ul>

        {user_id ? (
          <ul className="flex">
            <li className="mr-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex">
            <li className="mr-6">
              <a href="/login" className="text-white hover:text-gray-300">
                Đăng nhập
              </a>
            </li>
            <li className="mr-6">
              <a href="/register" className="text-white hover:text-gray-300">
                Đăng ký
              </a>
            </li>
          </ul>
        )}
      </nav>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <footer className="bg-gray-800 w-full py-4 text-center ">
        <p className="text-white">© 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserLayout;
