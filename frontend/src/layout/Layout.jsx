import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-800 h-screen">
        <div className="flex items-center justify-center h-16 text-white text-xl font-bold">
          University
        </div>
        <ul className="mt-4">
          <li>
            <a
              href="/"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Search
            </a>
          </li>
          <li>
            <a
              href="/favourite"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Favorite
            </a>
          </li>
          <li>
            <a
              href="/university"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              University
            </a>
          </li>
          <li>
            <a
              href="/major-group"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Major group
            </a>
          </li>
          <li>
            <a
              href="/statistics"
              className="text-white hover:text-gray-300 block py-2 px-4"
            >
              Statistics
            </a>
          </li>
        </ul>
      </div>
      <div className="w-5/6 bg-gray-200 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
