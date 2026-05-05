import { useNavigate } from "react-router-dom";
import UserList from "./components/UserList.jsx";
import Todos from "./components/Todos.jsx";

function Dashboard() {
  const navigate = useNavigate();
  
  // Read user directly from localStorage
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  
  // Read token
  const token = localStorage.getItem("token");

  // If not logged in, redirect to login
  if (!token || !user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-90">Welcome: {user?.email}</p>
          </div>
          <button
            className="px-6 py-2 bg-red-500 font-semibold text-white hover:bg-red-600 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Todos Section */}
        <section className="mb-8">
          <Todos />
        </section>

        {/* Users Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Users</h2>
          <UserList />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;