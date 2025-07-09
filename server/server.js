const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = ['https://imagify-neon.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Handle preflight (OPTIONS) requests
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
