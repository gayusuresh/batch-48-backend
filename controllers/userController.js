const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create a new user
// @route   POST /api/users
const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error('Please provide both name and email');
  }

  const user = await userService.createUser({ name, email });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user
  });
});

// @desc    Get all users
// @route   GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update a user
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser
  });
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
