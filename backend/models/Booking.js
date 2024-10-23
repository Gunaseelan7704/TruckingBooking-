const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    truckType: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    cargoDetails: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
