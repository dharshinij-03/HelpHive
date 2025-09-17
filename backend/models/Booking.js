// backend/models/Booking.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',   // ✅ Match model name
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',      // ✅ Match model name
    required: true,
  },
  helper: {
    type: Schema.Types.ObjectId,
    ref: 'User',      // ✅ Match model name
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  scheduledDate: {
    type: Date, // ✅ New field for scheduling timing
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'], // ✅ Track payments
    default: 'unpaid',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt automatically

// ✅ Capitalize model name for consistency
module.exports = mongoose.model('Booking', BookingSchema);
