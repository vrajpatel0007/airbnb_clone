const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        contact_number: {
                type: Number
        },
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    maxGuests: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    images: [{
        type: String
    }],
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    availability: [
        {
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

propertySchema.index({ title: 'text', description: 'text', 'address.city': 'text', 'address.state': 'text', 'address.country': 'text' });

module.exports = mongoose.model('Property', propertySchema);
