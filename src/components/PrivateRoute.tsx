import { Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
