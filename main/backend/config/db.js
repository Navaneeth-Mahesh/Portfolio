const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log(`MongoDB Connected Successfully `);
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error.message);

    // Don't crash the server
    return null;
  }
};

module.exports = connectDB;