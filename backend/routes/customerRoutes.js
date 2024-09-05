// routes/customerRoutes.js
const express = require('express');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer,updateCustomerById } = require('../controllers/customerController');
const router = express.Router();

router.post('/customers', createCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', updateCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router;
