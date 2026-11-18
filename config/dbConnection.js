const mongoose = require('mongoose');

/**
 * Connect to MongoDB using Mongoose.
 * Supports both local MongoDB Compass connections (mongodb://127.0.0.1:27017/...)
 * and cloud MongoDB Atlas connections (mongodb+srv://...).
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Re-throw so server.js knows connection failed and aborts startup
    throw error;
  }
};

module.exports = connectDB;
