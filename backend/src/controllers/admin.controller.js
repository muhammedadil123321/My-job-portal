const Job = require("../models/Job");
const User = require("../models/User");
const EmployerProfile = require("../models/Employerprofile");
const WorkerProfile = require("../models/Workerprofile");
const Application = require("../models/Application");

/**
 * ========================================
 * GET ALL JOBS (Admin)
 * ========================================
 */
const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("employer", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * GET ALL EMPLOYERS (FIXED & PRODUCTION-READY)
 * For Employer Management Page
 * ========================================
 */
const getAllEmployers = async (req, res) => {
  try {
    // Step 1: Get all employers
    const employers = await User.find({
      role: "employer",
    }).select("_id name email profileImage createdAt");

    // Step 2: For each employer, fetch their details
    const employersWithDetails = await Promise.all(
      employers.map(async (emp) => {
        // FIX #1: Ensure emp._id is properly converted to string for comparison
        const employerId = emp._id.toString();

        // Step 2a: Get employer profile
        const profile = await EmployerProfile.findOne({
          user: emp._id,
        }).select("phoneNumber businessName profileImage");

        // Step 2b: FIX #2 - Get latest job with explicit field selection
        // The issue was likely missing the jobTitle selection
        const latestJob = await Job.findOne({
          employer: emp._id, // MongoDB will auto-convert ObjectId
        })
          .sort({ createdAt: -1 })
          .lean() // Use lean() for better performance on read-only queries
          .select("jobTitle workPlaceName createdAt");

        // FIX #3: Add debugging logs (optional - remove in production)
        if (!latestJob) {
          console.warn(
            `⚠️  No job found for employer: ${emp.name} (${employerId})`
          );
        } else {
          console.log(
            `✅ Job found for ${emp.name}: ${latestJob.jobTitle}`
          );
        }

        // Step 3: Build response object with proper fallbacks
        return {
          _id: emp._id,
          employerName: emp.name || "Unknown",
          email: emp.email || "No email",
          contactNo: profile?.phoneNumber || "No phone",
          profileImage: profile?.profileImage || emp.profileImage || "",
          workPlaceName:
            profile?.businessName || latestJob?.workPlaceName || "No workplace",
          hiringPosition:
            latestJob?.jobTitle || "No active job",
          postedDate: latestJob?.createdAt || emp.createdAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      employers: employersWithDetails,
    });
  } catch (error) {
    console.error("getAllEmployers Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employers",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * GET ALL PENDING JOBS
 * ========================================
 */
const getPendingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: "pending" }).populate(
      "employer",
      "name email profileImage"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending jobs",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * APPROVE JOB
 * ========================================
 */
const approveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found",
      });

    if (job.jobStatus === "active")
      return res.status(400).json({
        message: "Job already approved",
      });

    job.jobStatus = "active";

    await job.save();

    res.status(200).json({
      message: "Job approved successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve job",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * REJECT JOB
 * ========================================
 */
const rejectJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found",
      });

    job.jobStatus = "rejected";

    await job.save();

    res.status(200).json({
      message: "Job rejected successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject job",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * BLOCK JOB
 * ========================================
 */
const blockJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found",
      });

    job.jobStatus = "blocked";

    await job.save();

    res.status(200).json({
      message: "Job blocked successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to block job",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * UNBLOCK JOB
 * ========================================
 */
const unblockJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found",
      });

    job.jobStatus = "active";

    await job.save();

    res.status(200).json({
      message: "Job unblocked successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unblock job",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * DELETE JOB
 * ========================================
 */
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job)
      return res.status(404).json({
        message: "Job not found",
      });

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * GET ALL WORKERS
 * For Worker Management Page
 * ========================================
 */
const getAllWorkers = async (req, res) => {
  try {
    // Step 1: Get all workers (role is 'student' in DB)
    const workers = await User.find({
      role: "student",
    }).select("_id name email profileImage createdAt");

    // Step 2: Fetch details for each worker
    const workersWithDetails = await Promise.all(
      workers.map(async (worker) => {
        // Get worker profile
        const profile = await WorkerProfile.findOne({
          user: worker._id,
        }).select("phoneNumber age education skills area district state languages about");

        // Get latest application
        const latestApplication = await Application.findOne({
          worker: worker._id,
        })
          .sort({ createdAt: -1 })
          .lean()
          .select("jobSnapshot status createdAt");

        return {
          _id: worker._id,
          name: worker.name || "Unknown",
          email: worker.email || "No email",
          profileImage: profile?.profileImage || worker.profileImage || "",
          position: latestApplication?.jobSnapshot?.jobTitle || "No applications yet",
          appliedDate: latestApplication?.createdAt || worker.createdAt,
          phone: profile?.phoneNumber || "No phone",
          address: profile ? `${profile.area}, ${profile.district}, ${profile.state}` : "No address",
          age: profile?.age || "N/A",
          education: profile?.education || "N/A",
          skills: profile?.skills || [],
          language: profile?.languages?.join(", ") || "N/A",
          city: profile?.district || "",
          state: profile?.state || "",
          about: profile?.about || "No details provided.",
        };
      })
    );

    res.status(200).json({
      success: true,
      workers: workersWithDetails,
    });
  } catch (error) {
    console.error("getAllWorkers Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workers",
      error: error.message,
    });
  }
};

/**
 * ========================================
 * GET WORKER BY ID
 * For Admin View Profile Page
 * ========================================
 */
const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await User.findById(id).select("_id name email profileImage createdAt");
    if (!worker) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }

    const profile = await WorkerProfile.findOne({ user: id }).lean();
    const latestApplication = await Application.findOne({ worker: id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      worker: {
        _id: worker._id,
        name: worker.name || "Unknown",
        email: worker.email || "No email",
        profileImage: profile?.profileImage || worker.profileImage || "",
        position: latestApplication?.jobSnapshot?.jobTitle || "No applications yet",
        appliedDate: latestApplication?.createdAt || worker.createdAt,
        phone: profile?.phoneNumber || "No phone",
        address: profile ? `${profile.area}, ${profile.district}, ${profile.state}` : "No address",
        age: profile?.age || "N/A",
        education: profile?.education || "N/A",
        skills: profile?.skills || [],
        language: profile?.languages?.join(", ") || "N/A",
        city: profile?.district || "",
        state: profile?.state || "",
        about: profile?.about || "No details provided.",
      },
    });
  } catch (error) {
    console.error("getWorkerById Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch worker",
      error: error.message,
    });
  }
};

module.exports = {
  getAllJobsAdmin,
  getAllEmployers,
  getPendingJobs,
  approveJob,
  rejectJob,
  blockJob,
  unblockJob,
  deleteJob,
  getAllWorkers,
  getWorkerById,
};