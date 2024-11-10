const express = require('express');
const router = express.Router();
const addBookingMotoController = require('../controllers/BookingMotoController/addBooking')

router.post('/', addBookingMotoController.addBooking);

module.exports = router;