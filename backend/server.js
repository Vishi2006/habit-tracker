const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./src/config/db')
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');
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
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.trim()] : [])
];

if (process.env.NODE_ENV === 'production' && process.env.PRODUCTION_FRONTEND_URL) {
  allowedOrigins.push(...process.env.PRODUCTION_FRONTEND_URL.split(',').map(url => url.trim()));
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
})); 

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)

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

// Start server immediately, don't wait for DB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Ensure MongoDB connection is established
db.connectPromise.catch((err) => {
  console.error('⚠️ Failed to connect to MongoDB:', err.message);
});