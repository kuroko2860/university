import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./route/PrivateRoute";
import Layout from "./layout/Layout";
import Stats from "./pages/Stats";
import Truong from "./pages/Truong";
import TruongDetails from "./pages/TruongDetails";
import Search from "./pages/Search";

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
                <Truong />
              </PrivateRoute>
            }
          />
          <Route
            path="university/:id"
            element={
              <PrivateRoute>
                <TruongDetails />
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
            path="statistics"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
