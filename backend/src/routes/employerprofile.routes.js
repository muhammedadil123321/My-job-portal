const express = require("express");
const router = express.Router();

// Make sure filename matches exactly:
// employerProfile.controller.js
const {
  saveEmployerProfile,
  getMyEmployerProfile,
} = require("../controllers/employerProfile.controller");

const authMiddleware = require("../middlewares/auth.middleware");


// Create employer profile
router.post("/", authMiddleware, saveEmployerProfile);


// Get logged-in employer profile
router.get("/me", authMiddleware, getMyEmployerProfile);


// Update logged-in employer profile
router.put("/me", authMiddleware, saveEmployerProfile);


module.exports = router;
