const express = require("express");
const router = express.Router();
const addInvoice = require("../controllers/InvoiceController/addInvoice");
const getInvoiceByEmail = require("../controllers/InvoiceController/getInvoiceByEmail");

router.post("/", addInvoice.addInvoice);
router.get("/", getInvoiceByEmail.getInvoiceByEmail);

module.exports = router;
