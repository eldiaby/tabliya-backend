// Load environment variables from config.env
require('./config/env');

/* ─────────────────────────────────────────────────────── */
/* 📦 Core & Third-party Packages */
/* ─────────────────────────────────────────────────────── */
const express = require('express'); // Express framework
const morgan = require('morgan'); // HTTP request logger middleware
const cookieParser = require('cookie-parser'); // Cookie parser middleware
const fileUpload = require('express-fileupload'); // File upload middleware
const ms = require('ms');

/* ─────────────────────────────────────────────────────── */
/* 📦 Securety Packages */
/* ─────────────────────────────────────────────────────── */
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const cors = require('cors');

/* ─────────────────────────────────────────────────────── */
/* 🛠️  Custom Modules */
/* ─────────────────────────────────────────────────────── */
const connectDB = require('./config/db.js'); // Database connection
const authRouter = require('./routes/authRoutes.js'); // Auth routes
const tableRouter = require('./routes/tableRoutes.js'); // Auth routes

/* ─────────────────────────────────────────────────────── */
/* 🧱 Custom Middleware */
/* ─────────────────────────────────────────────────────── */
const errorHandlerMiddleware = require('./middleware/error-handler.js'); // Global error handler
const notFoundMiddleware = require('./middleware/not-found.js'); // Handle 404 - Not Found

/* ─────────────────────────────────────────────────────── */
/* 🚀 App Initialization */
/* ─────────────────────────────────────────────────────── */
const app = express(); // Initialize express app
const port = process.env.PORT || 5000; // Set server port

/* ─────────────────────────────────────────────────────── */
/* 🔍 Dev Logging (only in development mode) */
/* ─────────────────────────────────────────────────────── */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny')); // Morgan logging for development environment
}

/* ─────────────────────────────────────────────────────── */
/* 🧰 Securety Middleware */
/* ─────────────────────────────────────────────────────── */
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: ms(`15m`),
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
// app.use(mongoSanitizer());

/* ─────────────────────────────────────────────────────── */
/* 🧰 Global Middleware */
/* ─────────────────────────────────────────────────────── */
app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser(process.env.JWT_SECRET_KEY)); // Parse signed cookies
app.use(fileUpload()); // Handle file uploads
app.use(express.static(`${__dirname}/public`)); // Serve static files from "public" folder

/* ─────────────────────────────────────────────────────── */
/* 📡 Routes */
/* ─────────────────────────────────────────────────────── */
app.use('/api/v1/auth', authRouter); // Auth routes

/**
 * @desc    Test route for API root
 * @route   GET /api/v1/
 * @access  Public
 */
app.get('/api/v1/', (req, res) => {
  // console.log(req.signedCookies); // Log signed cookies for testing
  res.send('📦 This is the GET route for the tabliya project');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tables', tableRouter);

/* ─────────────────────────────────────────────────────── */
/* ⚠️ Error Handling */
/* ─────────────────────────────────────────────────────── */
app.use(notFoundMiddleware); // Handle 404 errors
app.use(errorHandlerMiddleware); // Handle application errors

/* ─────────────────────────────────────────────────────── */
/* 🔌 Start the Server */
/* ─────────────────────────────────────────────────────── */
const start = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(port, () => {
      console.log(`Server running and listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

start();
