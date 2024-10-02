const bookingService = require('../services/booking.service');
const propertyService = require('../services/property.service');

exports.createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        if (!booking) {
            return res.status(400).json({ message: 'Invalid booking data' });
        }
        const property =  await propertyService.propertybyid(booking)
        if (!property) {
            throw new Error('Property not found');
          }
          const overlappingBookings = await bookingService.overlappingBookings(booking)
          if (overlappingBookings.length > 0) {
            throw new Error('Selected dates are not available');
        }
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.booking(req.params.id)
        if (!booking) {
            return res.status(404).json({message:'Booking not found'});
        }
        const book = await bookingService.cancelBooking(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
