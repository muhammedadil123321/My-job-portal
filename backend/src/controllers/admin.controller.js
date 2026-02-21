const Job = require("../models/Job");

/**
 * GET ALL JOBS (Admin)
 */
const getAllJobsAdmin = async (req, res) => {
  try {

    const jobs = await Job.find()
      .populate("employer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message
    });

  }
};

/**
 * GET ALL PENDING JOBS
 * Admin only
 */
const getPendingJobs = async (req, res) => {
  try {

    const jobs = await Job.find({ jobStatus: "pending" })
      .populate("employer", "name email");

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending jobs",
      error: error.message
    });
  }
};



/**
 * APPROVE JOB
 * pending → active
 */
const approveJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    if (job.jobStatus === "active")
      return res.status(400).json({
        message: "Job already approved"
      });

    job.jobStatus = "active";

    await job.save();

    res.status(200).json({
      message: "Job approved successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to approve job",
      error: error.message
    });
  }
};



/**
 * REJECT JOB
 * any → rejected
 */
const rejectJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    job.jobStatus = "rejected";

    await job.save();

    res.status(200).json({
      message: "Job rejected successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to reject job",
      error: error.message
    });
  }
};



/**
 * BLOCK JOB
 * active → blocked
 */
const blockJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    job.jobStatus = "blocked";

    await job.save();

    res.status(200).json({
      message: "Job blocked successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to block job",
      error: error.message
    });
  }
};



/**
 * UNBLOCK JOB
 * blocked → active
 */
const unblockJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    job.jobStatus = "active";

    await job.save();

    res.status(200).json({
      message: "Job unblocked successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to unblock job",
      error: error.message
    });
  }
};



/**
 * DELETE JOB
 * Admin only
 */
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message
    });
  }
};



module.exports = {
  getPendingJobs,
  approveJob,
  rejectJob,
  blockJob,
  unblockJob,
  deleteJob,
  getAllJobsAdmin 
};
