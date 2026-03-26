import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../shared/Spinner";

const PublicRoute = ({children}) => {
    const { user, loading } = useAuth();

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
              <Spinner />
            </div>
          );  
    }

    if(user) {
        return (
            <Navigate to="/profile" replace />
        )
    }
  return children
}

export default PublicRoute