require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// STEP 5.1: Check if env is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

// STEP 5.2: Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("MongoDB error:", err.message));

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
