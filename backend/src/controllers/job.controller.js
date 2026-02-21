const Job = require("../models/Job");



const updateJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Optional security check
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update job",
      error: error.message
    });

  }
};
// GET EMPLOYER JOBS
const getEmployerJobs = async (req, res) => {

  try {

    const employerId = req.user.id;

    const jobs = await Job.find({

      employer: employerId

    });

    res.status(200).json(jobs);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// ============================
// CREATE JOB (EMPLOYER)
// ============================
const createJob = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized. Employer ID missing."
      });
    }

    const job = new Job({
      ...req.body,
      employer: req.user.id,
      jobStatus: "pending"
    });

    await job.save();

    res.status(201).json({
      message: "Job submitted for admin approval",
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

const deleteJob = async (req, res) => {

  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job)
    return res.status(404).json({ message: "Job not found" });

  res.json({ message: "Job deleted successfully" });

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
if (job.applicants.some(id => id.toString() === req.user.userId)) {
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
  applyJob,
  updateJob,
  deleteJob,
getEmployerJobs
};
