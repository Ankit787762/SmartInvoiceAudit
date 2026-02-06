function Home({ setPage }) {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="flex justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome to Smart-Audit
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Automate invoice processing, expense tracking, and duplicate bill
            detection using AI-powered automation.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPage("upload")}
              className="rounded-md bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              Upload Invoice
            </button>

            <button
              onClick={() => setPage("dashboard")}
              className="rounded-md border px-8 py-3 text-gray-700 hover:bg-gray-100"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                📄 Invoice OCR
              </h3>
              <p className="text-sm text-gray-600">
                Automatically extract vendor, amount, tax, and date from invoice
                images.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                🧠 Duplicate Detection
              </h3>
              <p className="text-sm text-gray-600">
                AI flags duplicate or suspicious invoices before approval.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                📊 Expense Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Centralized dashboard for finance and operations teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
