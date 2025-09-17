// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware to protect routes
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};