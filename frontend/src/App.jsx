import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setPage={setPage} />

      {page === "home" && <Home setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
      {page === "upload" && <Upload />}
    </div>
  );
}

export default App;
