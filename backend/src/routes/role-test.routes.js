const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Student only
router.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({ message: "Student access granted" });
  }
);

// Employer only
router.get(
  "/employer",
  authMiddleware,
  roleMiddleware("employer"),
  (req, res) => {
    res.json({ message: "Employer access granted" });
  }
);

// Admin only
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

module.exports = router;
