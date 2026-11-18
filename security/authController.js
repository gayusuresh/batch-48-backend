/**
 * Security & Authentication Controller Placeholders
 *
 * ARCHITECTURAL PURPOSE:
 * This file resides in the dedicated `security/` folder to demonstrate proper modular
 * separation of concerns for beginner backend developers.
 *
 * IMPORTANT NOTE:
 * In this foundational demonstration project, production authentication tools such as JWT,
 * bcrypt password hashing, and authentication middleware are intentionally not implemented.
 * The primary architectural focus is Notes CRUD operations and the User-to-Notes Mongoose relationship.
 *
 * In a production-ready application, authentication logic, token generation, credential verification,
 * and rate-limiting middleware would be implemented inside this security layer.
 */

const registerPlaceholder = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Register endpoint placeholder. In production, password hashing (bcrypt), input validation, and user creation reside here.'
  });
};

const loginPlaceholder = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Login endpoint placeholder. In production, credential verification and JWT generation reside here.'
  });
};

module.exports = {
  registerPlaceholder,
  loginPlaceholder
};
