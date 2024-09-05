// controllers/customerController.js
const Customer = require("../models/customerModel");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a customer by id
exports.updateCustomerById = async (req, res) => {
  try {
    const updatedRecord = await Customer.findByIdAndUpdate(
      req.params.id, // The ID of the record to update
      req.body, // The update data
      { new: true } // Option to return the updated record
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
