const express = require('express');
const router = express.Router();

const addBookingMotoController = require('../controllers/BookingMotoController/addBooking');
const getBookingMotoByEmailController = require('../controllers/BookingMotoController/getBookingByEmail');
const getBookingMotoByNumberPlateController = require('../controllers/BookingMotoController/getBookingByNumberPlate');
const deleteBookingController = require('../controllers/BookingMotoController/deleteBooking');
const acceptBookingController = require('../controllers/BookingMotoController/acceptBooking'); // Import đúng controller
const getBookingById = require('../controllers/BookingMotoController/getBookingById');

router.post('/', addBookingMotoController.addBooking);
router.get('/email/:email', getBookingMotoByEmailController.getBookingByEmail);
router.get('/numberPlate/:numberPlate', getBookingMotoByNumberPlateController.getBookingByNumberPlate);
router.get('/:id', getBookingById.getBookingById);
router.delete('/delete/:id', deleteBookingController.deleteBooking);


// Thêm route PATCH để cập nhật booking theo id
router.patch('/accept/:id', acceptBookingController.acceptBooking);

module.exports = router;