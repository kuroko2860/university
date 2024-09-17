import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./route/PrivateRoute";
import Layout from "./layout/Layout";
import Stats from "./pages/stats/Stats";
import University from "./pages/university/University";
import Search from "./pages/Search";
import UniversityDetail from "./pages/university/UniversityDetail";
import MajorGroup from "./pages/major_group/MajorGroup";
import Favourite from "./pages/Favourite";
import PopularUniversity from "./pages/stats/PopularUniversity";
import PopularMajor from "./pages/stats/PopularMajor";
import MajorRate from "./pages/stats/MajorRate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="university"
            element={
              <PrivateRoute>
                <University />
              </PrivateRoute>
            }
          />
          <Route
            path="major-group"
            element={
              <PrivateRoute>
                <MajorGroup />
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
            path="search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />

          <Route
            path="favourite"
            element={
              <PrivateRoute>
                <Favourite />
              </PrivateRoute>
            }
          />

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

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
