const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middlewares/errorHandler');

// 1 & 2. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 6. Body parser middleware for incoming JSON requests
app.use(express.json());

// 8. Health-check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notes Management API is operational',
    timestamp: new Date().toISOString()
  });
});

// 7. Configure and mount API routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Resource not found on endpoint: ${req.originalUrl}`);
  next(error);
});

// 9. Centralized error handling middleware
app.use(errorHandler);

// 10. Connect to MongoDB before starting the Express server
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('CRITICAL: Database connection failed. Express server will not start.');
    process.exit(1);
  }
};

// Start the server if file is run directly
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
