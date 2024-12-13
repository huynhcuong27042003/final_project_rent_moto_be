const express = require('express');
const router = express.Router();
const addInvoice = require('../controllers/InvoiceController/addInvoice');

router.post('/', addInvoice.addInvoice);

module.exports = router; 
