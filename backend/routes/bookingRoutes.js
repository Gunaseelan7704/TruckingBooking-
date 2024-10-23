const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Get all bookings for a user
router.get('/', auth, async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
});

// Create a booking
router.post('/', auth, async (req, res) => {
    const { truckType, pickupLocation, dropoffLocation, cargoDetails } = req.body;

    const newBooking = new Booking({
        user: req.user.id,
        truckType,
        pickupLocation,
        dropoffLocation,
        cargoDetails
    });

    await newBooking.save();
    res.json(newBooking);
});

module.exports = router;
