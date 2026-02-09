const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createJob,
  getAllJobs,
  getSingleJob,
  applyJob
} = require("../controllers/job.controller");

/**
 * EMPLOYER → create job
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createJob
);

/**
 * STUDENT → apply for job
 */
router.post(
  "/:id/apply",
  authMiddleware,
  roleMiddleware("student"),
  applyJob
);

/**
 * PUBLIC → view jobs
 */
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

module.exports = router;
