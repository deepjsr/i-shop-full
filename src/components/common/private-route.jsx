import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const isAuthenticated = cookies["username"];

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
