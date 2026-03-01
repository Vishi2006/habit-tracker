const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.env.MONGODB_URL;
if (!uri) {
  process.exit(1);
}

// Connection options for MongoDB Atlas
const connectionOptions = {
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority',
  socketTimeoutMS: 45000,
};

const connectToMongoDB = async () => {
  await mongoose.connect(uri, connectionOptions);
  return mongoose.connection;
};

const connectPromise = connectToMongoDB();

module.exports = mongoose.connection;
module.exports.connectPromise = connectPromise;