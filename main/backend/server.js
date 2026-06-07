require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const mongoConn = await connectDB();

    if (mongoConn) {
      console.log("MongoDB Connected Successfully ");
    } else {
      console.warn(
        "MongoDB not connected. Contact submissions will fail until DB auth/connection is fixed."
      );
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server Startup Error:", error);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();