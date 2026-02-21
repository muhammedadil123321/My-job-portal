const express = require("express");
const router = express.Router();

// Make sure the controller path matches the actual filename
const {
  saveWorkerProfile,
  getMyWorkerProfile,
} = require("../controllers/workerprofile.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Create worker profile (optional – you can also rely only on PUT /me)
router.post("/", authMiddleware, saveWorkerProfile);

// Get logged-in user's profile
router.get("/me", authMiddleware, getMyWorkerProfile);

// Update logged-in user's profile
router.put("/me", authMiddleware, saveWorkerProfile);

module.exports = router;
