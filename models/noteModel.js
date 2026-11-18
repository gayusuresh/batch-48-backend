const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      required: [true, 'Note description is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A valid userId is required to create a note']
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
