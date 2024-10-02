const bookingService = require('../services/booking.service');
const propertyService = require('../services/property.service');

const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        if (!booking) {
            return res.status(400).json({ message: 'Invalid booking data' });
        }
        const property = await propertyService.propertybyid(booking)
        if (!property) {
            throw new Error('Property not found');
        }
        const overlappingBookings = await bookingService.overlappingBookings(booking)
        if (overlappingBookings.length > 0) {
            throw new Error('Selected dates are not available');
        }
        res.status(201).json({ message: "successfully Booking", data: booking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: "Booking", data: booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json({ data: bookings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.booking(req.params.id)
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        const book = await bookingService.cancelBooking(req.params.id);
        res.status(200).json({ message: " booking cancel Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    cancelBooking,
}