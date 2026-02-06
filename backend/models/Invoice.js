import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    vendor: String,
   amount: {
    type: Number,
    default: 0
    },
    tax: Number,
    date: String,
    duplicate: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
