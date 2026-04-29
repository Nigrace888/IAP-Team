import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl gap-8">
      Welcome to Dashboard 🚀

        <Link className="w-48 h-10 bg-red-500 font-bold text-white hover:bg-red-800 text-center rounded-md cursor-pointer" to="/">
          Sign Out
        </Link>
    </div>
  );
}

export default Dashboard;
