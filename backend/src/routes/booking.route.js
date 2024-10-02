const express = require('express');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

router.post('/Booking', bookingController.createBooking);
router.get('/AllBookings', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
