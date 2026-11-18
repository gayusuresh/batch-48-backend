/**
 * Centralized Error Handling Middleware
 *
 * Catches all errors forwarded via next(err) or asyncHandler and returns
 * a standardized JSON error response.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose CastError (e.g. malformed or invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found or invalid format for field '${err.path}'`;
  }

  // Handle Mongoose Duplicate Key Error (MongoDB error code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for field '${field}'. Please use a unique value.`;
  }

  // Handle Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Handle explicit custom status codes set on error object
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
