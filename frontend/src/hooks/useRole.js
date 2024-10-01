const useAdmin = () => {
  return localStorage.getItem("user_role") == "admin";
};

export default useAdmin;
