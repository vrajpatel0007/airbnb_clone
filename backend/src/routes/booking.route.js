const express = require('express');
const bookingController = require('../controllers/booking.controller');
const { authUser, authorizeAdmin } = require("../middleware/auth");

const router = express.Router();

router.post('/Booking',authUser, bookingController.createBooking);
router.get('/AllBookings',authUser, authorizeAdmin, bookingController.getAllBookings);
router.get('/:id',authUser, bookingController.getBookingById);
router.delete('/:id/cancel',authUser, bookingController.cancelBooking);

module.exports = router;
