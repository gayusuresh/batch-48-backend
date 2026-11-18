const noteService = require('../services/noteService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create a new note
// @route   POST /api/notes
const createNote = asyncHandler(async (req, res) => {
  const { title, description, category, isPinned, userId } = req.body;

  if (!title || !description || !userId) {
    res.status(400);
    throw new Error('Please provide title, description, and userId');
  }

  const note = await noteService.createNote({
    title,
    description,
    category,
    isPinned,
    userId
  });

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note
  });
});

// @desc    Get all notes (supports optional ?populate=true query param)
// @route   GET /api/notes
const getAllNotes = asyncHandler(async (req, res) => {
  const populateUser = req.query.populate === 'true';
  const notes = await noteService.getAllNotes(populateUser);

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc    Get a single note by ID (supports optional ?populate=true)
// @route   GET /api/notes/:id
const getNoteById = asyncHandler(async (req, res) => {
  const populateUser = req.query.populate === 'true';
  const note = await noteService.getNoteById(req.params.id, populateUser);

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Get all notes for a specific user
// @route   GET /api/notes/user/:userId
const getNotesByUserId = asyncHandler(async (req, res) => {
  const notes = await noteService.getNotesByUserId(req.params.userId);

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = asyncHandler(async (req, res) => {
  const updatedNote = await noteService.updateNote(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: updatedNote
  });
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = asyncHandler(async (req, res) => {
  const deletedNote = await noteService.deleteNote(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
    data: deletedNote
  });
});

// @desc    Get notes populated with user details
// @route   GET /api/notes/details
const getNotesWithUserDetails = asyncHandler(async (req, res) => {
  const notes = await noteService.getNotesWithUserDetails();

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  getNotesByUserId,
  updateNote,
  deleteNote,
  getNotesWithUserDetails
};
