import Login from "./Login";
import Dashboard from "./Dashboard";
//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./Signup";

function App() {
  //const [page, setPage] = useState("login");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/*
      {page === "login" && <Login />}
      {page === "dashboard" && <Dashboard />}
      <button onClick={()=> setPage(page ==="login"? "dashboard":"login")}>
        change Page
      </button>*/}
    </>
  );
}

export default App;
