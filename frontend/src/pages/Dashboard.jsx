import InvoiceList from "../components/InvoiceList";

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Expense Dashboard
      </h2>

      <InvoiceList />
    </div>
  );
}

export default Dashboard;
