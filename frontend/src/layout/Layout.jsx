import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-800 h-screen fixed">
        <div className="flex items-center justify-center h-16 text-white text-xl font-bold">
          MANUNIE ADMIN
        </div>
        <ul className="mt-4">
          <li>
            <a
              href="/admin"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Trường học
            </a>
          </li>

          <li>
            <a
              href="/admin/statistics"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Thống kê
            </a>
          </li>
          <div className="w-full h-[2px] bg-gray-600 my-3"></div>
          <li
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 block py-2 px-4 cursor-pointer"
          >
            Đăng xuất
          </li>
        </ul>
      </div>
      <div className="ml-auto w-5/6 bg-gray-200 h-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
