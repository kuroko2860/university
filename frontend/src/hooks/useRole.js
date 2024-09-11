import { useState, useEffect } from "react";
import jwt from "jwt-decode";


const useRole = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const storedRole = decodedToken ? decodedToken.role : "";
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return role;
};

export default useRole;
