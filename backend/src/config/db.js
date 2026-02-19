const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.env.MONGODB_URL;
if (!uri) {
  console.error('❌ MongoDB URI not configured. Set MONGODB_URL in .env');
  process.exit(1);
}

// Connection options for MongoDB Atlas
const connectionOptions = {
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority',
  socketTimeoutMS: 45000,
};

let retryCount = 0;
const maxRetries = 3;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, connectionOptions);
    console.log('✅ MongoDB connected successfully');
    retryCount = 0; // Reset retry count on successful connection
    return mongoose.connection;
  } catch (err) {
    retryCount++;
    console.error(`❌ MongoDB connection failed (Attempt ${retryCount}/${maxRetries}):`, err.message);
    
    if (retryCount < maxRetries) {
      console.log(`⏳ Retrying in 5 seconds...`);
      setTimeout(connectToMongoDB, 5000);
    } else {
      console.error('❌ Max retries reached. Server will continue but database operations may fail.');
    }
  }
};

const connectPromise = connectToMongoDB();

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose disconnected from MongoDB. Attempting to reconnect...');
  connectToMongoDB();
});

module.exports = mongoose.connection;
module.exports.connectPromise = connectPromise;