import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./route/PrivateRoute";
import Layout from "./layout/Layout";
import Stats from "./pages/stats/Stats";
import University from "./pages/university/University";
import Search from "./user/Search";
import UniversityDetail from "./pages/university/UniversityDetail";
import PopularUniversity from "./pages/stats/PopularUniversity";
import PopularMajor from "./pages/stats/PopularMajor";
import MajorRate from "./pages/stats/MajorRate";
import UserLayout from "./user/layout/Layout";
import UserUniversity from "./user/university/University";
import UserFavourite from "./user/Favourite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<UserUniversity />} />
          <Route
            path="university/:id"
            element={
              // <PrivateRoute>
              <UniversityDetail />
              // </PrivateRoute>
            }
          ></Route>
          <Route
            path="search"
            element={
              // <PrivateRoute>
              <Search />
              // </PrivateRoute>
            }
          />
          <Route path="favourite" element={<UserFavourite />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <University />
              </PrivateRoute>
            }
          />

          <Route
            path="university/:id"
            element={
              <PrivateRoute>
                <UniversityDetail />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="statistics"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route path="popular-universities" element={<PopularUniversity />} />

          <Route path="popular-majors" element={<PopularMajor />} />
          <Route path="major-rate" element={<MajorRate />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
