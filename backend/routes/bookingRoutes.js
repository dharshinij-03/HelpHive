// backend/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// @route   GET /api/bookings/my-bookings
// @desc    Get all bookings for the authenticated user (customer)
// @access  Private
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('service', ['title', 'description', 'price'])
      .populate('helper', ['username']);

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel a specific booking
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to cancel this booking' });
    }

    await Booking.deleteOne({ _id: booking._id });

    res.json({ msg: 'Booking cancelled', bookingId: booking._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/bookings/:id/schedule
// @desc    Schedule or update booking timing
// @access  Private
router.put('/:id/schedule', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to schedule this booking' });
    }

    booking.scheduledDate = req.body.date;
    booking.status = 'confirmed';
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/bookings/:id/pay
// @desc    Mark booking as paid
// @access  Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to pay for this booking' });
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    await booking.save();

    res.json({ msg: 'Payment successful', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
