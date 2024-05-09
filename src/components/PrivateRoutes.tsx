import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/blogs" /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
