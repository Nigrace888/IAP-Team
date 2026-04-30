import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl gap-8">
      <p>Welcome to Dashboard 🚀</p>
      <p className="font-bold">Welcome: {user?.email}</p>
      <button
        className="w-48 h-10 bg-red-500 font-bold text-white hover:bg-red-800 text-center rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
