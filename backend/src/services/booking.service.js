const Booking = require('../models/booking.model');

const createBooking = async (bookingData) => {
    return await booking.create(bookingData);
};

const overlappingBookings = async (bookingData) => {
    return await Booking.find({
        property: bookingData.property,
        startDate: { $lt: bookingData.endDate },
        endDate: { $gt: bookingData.startDate },
    });
}

const getBookingById = async (id) => {
    return await Booking.findById(id).populate('user', 'name email').populate('property', 'title address');
};

const getAllBookings = async () => {
    return await Booking.find().populate('user', 'name').populate('property', 'title');
};

const booking = async (id) => {
    return await Booking.findById(id);
}

const cancelBooking = async (id) => {
    return await booking.findByIdAndDelete(id);
};


module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    cancelBooking,
    booking,
    overlappingBookings
}