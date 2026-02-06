import express from "express";
import invoiceRoutes from "./invoiceRoutes.js";

const router = express.Router();

// Main route prefix: /api/invoices
router.use("/invoices", invoiceRoutes);

export default router;
