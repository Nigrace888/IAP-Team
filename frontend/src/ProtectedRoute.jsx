import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";  // ✅ Make sure path is correct

function ProtectedRoute({ children }) {
  const auth = useContext(AuthContext);
  
  // If AuthContext is still undefined, use this fallback
  if (!auth) {
    // Check localStorage directly
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  const { isAuthenticated } = auth;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;