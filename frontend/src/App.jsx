import Login from "./Login";
import Dashboard from "./Dashboard";
//import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  //const [page, setPage] = useState("login");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
