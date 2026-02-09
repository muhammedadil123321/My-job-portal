const Job = require("../models/Job");

// ============================
// CREATE JOB (EMPLOYER)
// ============================
const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      employer: req.user.id // from JWT
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      message: "Job creation failed",
      error: error.message
    });
  }
};

// ============================
// GET ALL JOBS (PUBLIC)
// ============================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: "active" });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs"
    });
  }
};

// ============================
// GET SINGLE JOB (PUBLIC)
// ============================
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job"
    });
  }
};

// ============================
// APPLY JOB (STUDENT)
// ============================
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // prevent duplicate applications
    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    job.applicants.push(req.user.id);
    await job.save();

    res.status(200).json({
      message: "Job applied successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to apply job",
      error: error.message
    });
  }
};

// ============================
// EXPORTS
// ============================
module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  applyJob
};
