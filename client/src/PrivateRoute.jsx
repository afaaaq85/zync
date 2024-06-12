import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateRoute = () => {
  const { userToken } = useAuth();


  return userToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
