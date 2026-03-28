import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../shared/Spinner";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({children}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
