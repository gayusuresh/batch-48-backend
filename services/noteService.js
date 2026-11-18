const Note = require('../models/noteModel');
const User = require('../models/userModel');

/**
 * Service handling all Note database queries and business logic.
 */
const noteService = {
  // 1. Create a note (verifying referenced user exists)
  createNote: async (noteData) => {
    const userExists = await User.findById(noteData.userId);
    if (!userExists) {
      const error = new Error(`Cannot create note: Referenced user with id ${noteData.userId} does not exist`);
      error.statusCode = 404;
      throw error;
    }

    const note = new Note(noteData);
    return await note.save();
  },

  // 2. Get all notes
  getAllNotes: async (populateUser = false) => {
    let query = Note.find().sort({ isPinned: -1, createdAt: -1 });
    if (populateUser) {
      query = query.populate('userId', 'name email');
    }
    return await query.exec();
  },

  // 3. Get note by ID
  getNoteById: async (id, populateUser = false) => {
    let query = Note.findById(id);
    if (populateUser) {
      query = query.populate('userId', 'name email');
    }
    const note = await query.exec();

    if (!note) {
      const error = new Error(`Note not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }

    return note;
  },

  // 4. Get notes belonging to a particular user
  getNotesByUserId: async (userId) => {
    const userExists = await User.findById(userId);
    if (!userExists) {
      const error = new Error(`Cannot fetch notes: User with id ${userId} does not exist`);
      error.statusCode = 404;
      throw error;
    }

    return await Note.find({ userId }).sort({ isPinned: -1, createdAt: -1 });
  },

  // 5. Update a note
  updateNote: async (id, updateData) => {
    // If updating userId, verify new user exists
    if (updateData.userId) {
      const userExists = await User.findById(updateData.userId);
      if (!userExists) {
        const error = new Error(`Cannot update note: Target user with id ${updateData.userId} does not exist`);
        error.statusCode = 404;
        throw error;
      }
    }

    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedNote) {
      const error = new Error(`Note not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }

    return updatedNote;
  },

  // 6. Delete a note
  deleteNote: async (id) => {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      const error = new Error(`Note not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return deletedNote;
  },

  // 7. Get notes with their associated user details using Mongoose populate
  getNotesWithUserDetails: async () => {
    return await Note.find()
      .populate('userId', 'name email createdAt')
      .sort({ isPinned: -1, createdAt: -1 });
  }
};

module.exports = noteService;
