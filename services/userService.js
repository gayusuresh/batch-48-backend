const User = require('../models/userModel');
const Note = require('../models/noteModel');

/**
 * Service handling all User database queries and business logic.
 */
const userService = {
  // 1. Create a user
  createUser: async (userData) => {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      const error = new Error('A user with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const user = new User({
      ...userData,
      email: normalizedEmail
    });

    return await user.save();
  },

  // 2. Get all users
  getAllUsers: async () => {
    return await User.find().sort({ createdAt: -1 });
  },

  // 3. Get user by ID
  getUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  },

  // 4. Update user details
  updateUser: async (id, updateData) => {
    // If updating email, ensure it's not taken by another user
    if (updateData.email) {
      const normalizedEmail = updateData.email.toLowerCase().trim();
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id }
      });

      if (existingUser) {
        const error = new Error('Email is already in use by another user');
        error.statusCode = 409;
        throw error;
      }
      updateData.email = normalizedEmail;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }

    return updatedUser;
  },

  // 5. Delete a user and associated notes
  deleteUser: async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }

    // Cascade delete any notes belonging to the deleted user
    await Note.deleteMany({ userId: id });

    return deletedUser;
  }
};

module.exports = userService;
