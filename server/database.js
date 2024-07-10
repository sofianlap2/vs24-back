const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to MongoDB");
    const db = mongoose.connection.db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectDB;
