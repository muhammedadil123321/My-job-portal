const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createJob,
  getAllJobs,
  getSingleJob,
  applyJob,
  getEmployerJobs,
  updateJob,
  deleteJob,
  getNearbyJobs,
} = require("../controllers/job.controller");

// CREATE JOB
router.post("/", authMiddleware, roleMiddleware("employer"), createJob);

router.get(
  "/my-jobs",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerJobs
);

// APPLY JOB
router.post("/:id/apply", authMiddleware, roleMiddleware("student"), applyJob);

// GET ALL ACTIVE JOBS (PUBLIC)
router.get("/", getAllJobs);

// GET NEARBY JOBS
router.get("/nearby", getNearbyJobs);

// GET SINGLE JOB
router.get("/:id", getSingleJob);

router.put("/:id", authMiddleware, roleMiddleware("employer"), updateJob);

router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
