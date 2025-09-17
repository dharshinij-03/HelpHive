// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Import the DB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes
const serviceRoutes = require('./routes/serviceRoutes');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', require('./routes/bookingRoutes')); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});