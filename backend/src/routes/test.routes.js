const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;
