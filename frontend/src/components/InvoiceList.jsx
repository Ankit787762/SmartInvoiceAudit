import { useEffect, useState } from "react";
import API_BASE from "../config";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/invoices`)
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading invoices...</p>;
  }

  if (invoices.length === 0) {
    return <p className="text-gray-500">No invoices found</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3">Vendor</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id} className="border-t">
              <td className="px-4 py-3">{inv.vendor || "Unknown"}</td>
              <td className="px-4 py-3">₹{inv.amount}</td>
              <td className="px-4 py-3">{inv.date}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    inv.isDuplicate
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {inv.isDuplicate ? "Duplicate" : "Approved"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
