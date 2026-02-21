const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  approveJob,
  rejectJob,
  blockJob,
  unblockJob, // added
  deleteJob,
  getPendingJobs,
  getAllJobsAdmin
} = require("../controllers/admin.controller");

router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware("admin"),
  getAllJobsAdmin
);

router.get(
  "/jobs/pending",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingJobs
);


router.put(
  "/jobs/:id/approve",
  authMiddleware,
  roleMiddleware("admin"),
  approveJob
);


router.put(
  "/jobs/:id/reject",
  authMiddleware,
  roleMiddleware("admin"),
  rejectJob
);


router.put(
  "/jobs/:id/block",
  authMiddleware,
  roleMiddleware("admin"),
  blockJob
);


router.put(
  "/jobs/:id/unblock",
  authMiddleware,
  roleMiddleware("admin"),
  unblockJob
);


router.delete(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteJob
);


module.exports = router;
