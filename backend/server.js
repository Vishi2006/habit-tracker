const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./src/config/db')
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors'); 
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./src/routes/authRoutes');
const habitRoutes = require('./src/routes/habitRoutes');
const isLoggedIn = require('./src/middleware/isLoggedIn');

// Security: Add helmet for HTTP headers
app.use(helmet());

// Security: compression middleware
app.use(compression());

// Security: Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per windowMs
  message: 'Too many authentication attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Enable CORS with proper configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.trim()] : []),
  ...(process.env.PRODUCTION_FRONTEND_URL
    ? process.env.PRODUCTION_FRONTEND_URL.split(',').map(url => url.trim())
    : [])
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
})); 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get('/health', (req, res) => {
  const dbOk = db.readyState === 1;
  res.status(dbOk ? 200 : 503).json({
    ok: dbOk,
    db: dbOk ? 'connected' : 'disconnected'
  });
});

// Apply rate limiter to auth endpoints only
app.use('/auth/login', authLimiter);
app.use('/auth/create', authLimiter);

app.use('/auth', authRoutes);
app.use('/habit', isLoggedIn, habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);