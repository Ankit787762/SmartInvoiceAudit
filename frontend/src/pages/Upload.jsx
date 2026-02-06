import UploadBill from "../components/UploadBill";

function Upload() {
  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Upload Invoice
        </h2>

        <UploadBill />
      </div>
    </div>
  );
}

export default Upload;
