import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/register", {
        username,
        password,
      });
      navigate("/login");
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-green-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          {/* <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">UNISEARCH</a>
          </div> */}
          {/* <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Tìm kiếm ngôi trường thích hợp nhất cho bạn!
          </p> */}
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Đã có tài khoản?</span>
            <a href="/login" className="underline">
              Đăng nhập
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Đăng ký tài khoản
          </h3>
          <form
            action="#"
            onSubmit={handleRegister}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">
                Username
              </label>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-500">
                  Password
                </label>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              {/* <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-green-200"
              /> */}
              {/* <label className="text-sm font-semibold text-gray-500">
                Remember me
              </label> */}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-green-200 focus:ring-4"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
