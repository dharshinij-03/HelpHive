// backend/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

console.log("🚀 serviceRoutes.js loaded");

// ========================================================
// @route   POST /api/services/create
// @desc    Create a new service (Helper only)
// @access  Private
// ========================================================
router.post('/create', auth, async (req, res) => {
  const { title, description, price, category, location } = req.body;

  if (req.user.role !== 'helper') {
    return res.status(403).json({ msg: 'Only helpers can create services.' });
  }

  try {
    const newService = new Service({
      user: req.user.id,
      title,
      description,
      price,
      category,
      location,
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   GET /api/services
// @desc    Get all services (Public)
// @access  Public
// ========================================================
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('user', ['username', 'email']);
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   GET /api/services/my-services
// @desc    Get all services created by the logged-in helper
// @access  Private
// ========================================================
router.get('/my-services', auth, async (req, res) => {
  console.log("✅ /my-services route called by:", req.user);

  try {
    const services = await Service.find({ user: req.user.id });
    console.log("📦 Services fetched:", services);

    res.json(services);
  } catch (error) {
    console.error("❌ Error fetching services:", error.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   GET /api/services/:id
// @desc    Get a single service by ID (Public)
// @access  Public
// ========================================================
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('user', ['username', 'email']);
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   PUT /api/services/:id
// @desc    Update a service (Helper only, owner)
// @access  Private
// ========================================================
router.put('/:id', auth, async (req, res) => {
  const { title, description, price, category, location } = req.body;

  try {
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this service' });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, price, category, location } },
      { new: true, runValidators: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   DELETE /api/services/:id
// @desc    Delete a service (Helper only, owner)
// @access  Private
// ========================================================
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this service' });
    }

    await service.deleteOne();
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   POST /api/services/book/:id
// @desc    Book a service (Customer only)
// @access  Private
// ========================================================
router.post('/book/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    if (req.user.role !== 'customer') {
      return res.status(403).json({ msg: 'Only customers can book services.' });
    }

    if (service.user.toString() === req.user.id) {
      return res.status(403).json({ msg: 'You cannot book your own service.' });
    }

    const newBooking = new Booking({
      service: service.id,
      customer: req.user.id,
      helper: service.user,
      status: 'pending',
    });

    await newBooking.save();
    res.json({ msg: 'Service booked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ========================================================
// @route   GET /api/services/category/:category
// @desc    Get all services by category
// @access  Public
// ========================================================
router.get('/category/:category', async (req, res) => {
  try {
    const services = await Service.find({
      category: { $regex: new RegExp(`^${req.params.category}$`, "i") }
    }).populate('user', ['username', 'email']);

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
