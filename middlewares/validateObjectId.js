const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId parameters in request routes.
 * Prevents Mongoose casting errors by intercepting invalid IDs early.
 *
 * @param {string} paramName - Parameter name in req.params to validate (default: 'id')
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid MongoDB ObjectId format for route parameter '${paramName}': ${id}`
      });
    }

    next();
  };
};

module.exports = validateObjectId;
