// models/customerModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  qty: Number,
  rate: Number,
  amount: Number // Auto-calculated in the frontend
});

const customerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  address: { type: String, required: true },
  products: [productSchema], // List of products
  grossAmount: Number, // Auto-calculated in the frontend
  discount: Number,
  shippingCharges: Number,
  roundOff: Number, // Auto-calculated in the frontend
  totalAmount: Number, // Auto-calculated in the frontend
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
