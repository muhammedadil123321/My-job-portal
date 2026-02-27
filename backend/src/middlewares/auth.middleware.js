const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("[authMiddleware] Missing or invalid Authorization header");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      console.error("[authMiddleware] Token decoded but no user id present:", decoded);
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Attach user payload to request so controllers can use req.user.id
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    console.error("[authMiddleware] Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
