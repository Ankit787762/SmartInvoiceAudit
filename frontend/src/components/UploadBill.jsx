import { useState } from "react";
import API_BASE from "../config";

function UploadBill() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an invoice image");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("invoice", file);

    try {
      const res = await fetch(`${API_BASE}/invoices/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.invoice); // REAL DATA FROM BACKEND
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Invoice Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 w-full rounded border p-2 text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upload & Process"}
      </button>

      {result && (
        <div className="mt-6 rounded-md border bg-gray-50 p-4 text-sm">
          <h4 className="mb-2 font-semibold text-gray-700">
            Extracted Details
          </h4>

          <div className="space-y-1 text-gray-700">
            <p><b>Vendor:</b> {result.vendor || "Unknown"}</p>
            <p><b>Amount:</b> ₹{result.amount}</p>
            <p><b>Date:</b> {result.date}</p>
          </div>

          {result.isDuplicate && (
            <p className="mt-2 font-semibold text-red-600">
              ⚠ Duplicate invoice detected
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadBill;
