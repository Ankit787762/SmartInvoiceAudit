import Invoice from "../models/Invoice.js";
import { processInvoice as aiProcessInvoice } from "../services/aiService.js";

// ================= UPLOAD & PROCESS =================
export const processInvoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { vendor, date, amount } = await aiProcessInvoice(req.file.path);

    const invoice = await Invoice.create({
      vendor,
      date,
      amount,
      file: req.file.filename,
    });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (err) {
    console.error("Invoice error:", err);
    res.status(500).json({
      success: false,
      message: "Invoice processing failed",
    });
  }
};

// ================= GET ALL INVOICES =================
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
};
