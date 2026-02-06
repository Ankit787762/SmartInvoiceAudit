export const uploadInvoice = async (file) => {
  const formData = new FormData();
  formData.append("invoice", file);

  const res = await fetch("http://localhost:5000/api/invoices/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
};
