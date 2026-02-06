function Navbar({ setPage }) {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h1 className="text-xl font-bold text-blue-600">
        Smart-Audit
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => setPage("dashboard")}
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </button>
        <button
          onClick={() => setPage("upload")}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Upload Invoice
        </button>
      </div>
    </div>
  );
}

export default Navbar;
