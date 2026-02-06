import Tesseract from "tesseract.js";
import Jimp from "jimp";
import path from "path";
import fs from "fs";

// ================= IMAGE PREPROCESS =================
const preprocessImage = async (imagePath) => {
  const processedPath = path.join("uploads", `processed-${Date.now()}.png`);

  const img = await Jimp.read(imagePath);
  await img
    .resize(1800, Jimp.AUTO)
    .grayscale()
    .contrast(0.6)
    .normalize()
    .quality(100)
    .writeAsync(processedPath);

  return processedPath;
};

// ================= SAFE NUMBER =================
const safeNumber = (v) => {
  if (!v) return 0;
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return isNaN(n) ? 0 : n;
};

// ================= CLEAN NAME =================
const cleanName = (name) => {
  if (!name) return "Unknown";
  return name
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(.)\1{2,}/g, "$1")
    .trim();
};

// ================= DATE =================
const extractDate = (text) => {
  const rules = [
    /(invoice date|bill date|date)[:\s]*([0-3]?\d[\/.-][01]?\d[\/.-]\d{2,4})/i,
  ];

  for (const r of rules) {
    const m = text.match(r);
    if (m) return m[2];
  }

  const fallback = text.match(/\b\d{2}[\/.-]\d{2}[\/.-]\d{4}\b/);
  return fallback ? fallback[0] : "Unknown";
};

// ================= AMOUNT =================
const extractAmount = (text) => {
  const priority = [
    /(grand total|net payable|amount payable|total)[^\d]{0,10}₹?\s?([\d,]+\.\d{1,2})/i,
    /(grand total|net payable|amount payable|total)[^\d]{0,10}₹?\s?([\d,]+)/i,
  ];

  for (const p of priority) {
    const m = text.match(p);
    if (m) return safeNumber(m[2]);
  }

  const nums = text.match(/₹?\s?\d{2,7}(\.\d{1,2})?/g) || [];
  const valid = nums.map(safeNumber).filter(n => n > 50 && n < 500000);

  return valid.length ? Math.max(...valid) : 0;
};

// ================= NAME (WORKING LOGIC) =================
const extractName = (text) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  // 1️⃣ CUSTOMER NAME (Bill To)
  for (let i = 0; i < lines.length; i++) {
    if (/bill to|customer name|customer/i.test(lines[i])) {
      const next = lines[i + 1];
      if (
        next &&
        /^[A-Za-z]{3,}\s[A-Za-z]{3,}/.test(next) &&
        !/(pvt|ltd|limited|hotel|restaurant|retail)/i.test(next)
      ) {
        return cleanName(next);
      }
    }
  }

  // 2️⃣ VENDOR (Hotel / Shop / Company)
  for (const l of lines.slice(0, 8)) {
    if (/(hotel|restaurant|cafe|shop|store|pvt|ltd|limited)/i.test(l)) {
      return cleanName(l);
    }
  }

  // 3️⃣ GSTIN fallback
  for (let i = 1; i < lines.length; i++) {
    if (/gstin/i.test(lines[i])) {
      return cleanName(lines[i - 1]);
    }
  }

  return "Unknown";
};

// ================= MAIN =================
export const processInvoice = async (imagePath) => {
  const processed = await preprocessImage(imagePath);

  const {
    data: { text },
  } = await Tesseract.recognize(processed, "eng");

  fs.unlink(processed, () => {});

  return {
    vendor: extractName(text),
    date: extractDate(text),
    amount: extractAmount(text),
  };
};
