/**
 * Async Handler Utility
 *
 * Wraps asynchronous route controller functions to catch unhandled promise rejections
 * and automatically forward them to Express's next() error handling middleware.
 *
 * @param {Function} fn - Asynchronous Express route handler (req, res, next)
 * @returns {Function} Express middleware handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
