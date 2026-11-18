const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const validateObjectId = require('../middlewares/validateObjectId');

// Collection routes
router.route('/')
  .post(createUser)
  .get(getAllUsers);

// Document-specific routes
router.route('/:id')
  .get(validateObjectId('id'), getUserById)
  .put(validateObjectId('id'), updateUser)
  .delete(validateObjectId('id'), deleteUser);

module.exports = router;
