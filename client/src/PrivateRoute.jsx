import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { userToken } = useAuth();


  return userToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
