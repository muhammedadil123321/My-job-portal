const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * ADMIN AUTHENTICATION EXPLANATION:
 * 
 * Admin authentication works the same way as student/employer authentication:
 * 1. Admin is a normal user with role = "admin" in the database
 * 2. Admin logs in using the same /api/auth/login endpoint
 * 3. Login returns a JWT token containing { id, role: "admin" }
 * 4. Admin includes this token in Authorization header: "Bearer <token>"
 * 5. authMiddleware verifies the token and attaches { id, role } to req.user
 * 6. roleMiddleware("admin") checks if req.user.role === "admin"
 * 7. If both pass, admin can access the protected route
 */

// GET /api/admin/dashboard
// Protected route: Only users with role "admin" can access
router.get(
  "/dashboard",
  authMiddleware,        // First: Verify JWT token and attach user to req.user
  roleMiddleware("admin"), // Second: Check if user role is "admin"
  (req, res) => {
    // If we reach here, user is authenticated and has admin role
    res.status(200).json({
      message: "Welcome Admin",
      user: {
        id: req.user.id,
        role: req.user.role
      }
    });
  }
);

module.exports = router;
