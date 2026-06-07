const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB is not connected");

      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please try again later.",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Create Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save message",
    });
  }
};

module.exports = {
  createContact,
};