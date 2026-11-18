const express = require('express');
const router = express.Router();

const {
  createNote,
  getAllNotes,
  getNoteById,
  getNotesByUserId,
  updateNote,
  deleteNote,
  getNotesWithUserDetails
} = require('../controllers/noteController');

const validateObjectId = require('../middlewares/validateObjectId');

// Base collection routes: create note, list notes (supports ?populate=true)
router.route('/')
  .post(createNote)
  .get(getAllNotes);

// Explicit populated route to fetch all notes with user details
router.route('/details')
  .get(getNotesWithUserDetails);

// Notes filtered by specific user ID
router.route('/user/:userId')
  .get(validateObjectId('userId'), getNotesByUserId);

// Single note routes by note ID
router.route('/:id')
  .get(validateObjectId('id'), getNoteById)
  .put(validateObjectId('id'), updateNote)
  .delete(validateObjectId('id'), deleteNote);

module.exports = router;
