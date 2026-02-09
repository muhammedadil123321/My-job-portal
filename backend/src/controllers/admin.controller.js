const Job = require("../models/Job");

const approveJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { jobStatus: "active" },
    { new: true }
  );

  res.json({
    message: "Job approved",
    job
  });
};

const rejectJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { jobStatus: "rejected" },
    { new: true }
  );

  res.json({
    message: "Job rejected",
    job
  });
};

const blockJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { jobStatus: "blocked" },
    { new: true }
  );

  res.json({
    message: "Job blocked",
    job
  });
};

module.exports = {
  approveJob,
  rejectJob,
  blockJob
};
