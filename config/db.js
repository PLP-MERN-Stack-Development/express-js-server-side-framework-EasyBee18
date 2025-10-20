const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const mongoURI = process.env.MONGOATLAS_URI || process.env.MONGO_URI;
PORT = 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;