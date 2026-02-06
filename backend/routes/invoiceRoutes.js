import express from "express";
import multer from "multer";
import { processInvoice, getInvoices } from "../controllers/invoiceController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/invoices",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("invoice"), processInvoice);
router.get("/", getInvoices);

export default router;
