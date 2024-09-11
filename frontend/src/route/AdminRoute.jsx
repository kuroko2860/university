import { Route, Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const AdminRoute = ({ element }) => {
  const role = useRole(); // Function to check if user is an admin
  const isAdmin = role == "admin";
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Route element={element} />;
};

export default AdminRoute;
