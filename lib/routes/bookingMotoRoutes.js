const express = require('express');
const router = express.Router();

const addBookingMotoController = require('../controllers/BookingMotoController/addBooking');
const getBookingMotoByEmailController = require('../controllers/BookingMotoController/getBookingByEmail');
const getBookingMotoByNumberPlateController = require('../controllers/BookingMotoController/getBookingByNumberPlate');
const deleteBookingController = require('../controllers/BookingMotoController/deleteBooking');
const acceptBookingController = require('../controllers/BookingMotoController/acceptBooking'); // Import đúng controller
const getBookingById = require('../controllers/BookingMotoController/getBookingById');
const getAllBookingsController = require('../controllers/BookingMotoController/getAllBookings');
const getFutureBookings = require('../controllers/BookingMotoController/getFutureBookings');

router.post('/', addBookingMotoController.addBooking);
router.get('/email/:email', getBookingMotoByEmailController.getBookingByEmail);
router.get('/numberPlate/:numberPlate', getBookingMotoByNumberPlateController.getBookingByNumberPlate);
router.get('/:id', getBookingById.getBookingById);
router.delete('/delete/:id', deleteBookingController.deleteBooking);
router.get('/', getAllBookingsController.getAllBookings);
router.patch('/accept/:id', acceptBookingController.acceptBooking);
router.get('/emptytime/:numberPlate', getFutureBookings.getFutureBookings);

module.exports = router;