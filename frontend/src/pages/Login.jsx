import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("user_id", decoded.userId);
      localStorage.setItem("user_role", decoded.role);
      navigate("/");
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 mb-6 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Đăng nhập
      </button>
      <p className="text-center mt-4">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Đăng ký
        </a>
      </p>
    </form>
  );
}

export default Login;
