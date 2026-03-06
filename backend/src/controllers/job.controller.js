const Job = require("../models/Job");
const axios = require("axios");

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Optional security check
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update job",
      error: error.message,
    });
  }
};
// GET EMPLOYER JOBS
const getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await Job.find({
      employer: employerId,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
        message: "Unauthorized. Employer ID missing.",
      });
    }

    const { workplaceAddress, ...otherFields } = req.body;

    if (!workplaceAddress) {
      return res.status(400).json({
        message: "Workplace address is required",
      });
    }

    let coordinates;

    // 🔥 Convert address to coordinates using OpenStreetMap
    try {
      const geoResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: workplaceAddress,
            format: "json",
            limit: 1,
          },
          headers: {
            // Nominatim STRICTLY requires a valid User-Agent
            "User-Agent": "JobPortal-App/1.0",
          },
          timeout: 5000,
        }
      );

      if (!geoResponse.data || geoResponse.data.length === 0) {
        return res.status(400).json({
          message: "Could not find map coordinates for the provided address. Please provide a more specific address.",
        });
      }

      const latitude = parseFloat(geoResponse.data[0].lat);
      const longitude = parseFloat(geoResponse.data[0].lon);
      coordinates = [longitude, latitude]; // longitude FIRST

    } catch (geoError) {
      console.error("Geocoding Service Error:", geoError.message);
      return res.status(503).json({
        message: "Address validation service (Map) is currently unavailable or the address could not be resolved. Please try again."
      });
    }

    const job = new Job({
      ...otherFields,
      workplaceAddress,
      employer: req.user.id,
      jobStatus: "pending",

      // 🔥 Correct GeoJSON format
      location: {
        type: "Point",
        coordinates: coordinates,
      },
    });

    await job.save();

    res.status(201).json({
      message: "Job submitted for admin approval",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      message: "Job creation failed",
      error: error.message,
    });
  }
};

// ============================
// GET ALL JOBS (PUBLIC)
// ============================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      jobStatus: "active",
      isActive: true,
    })
      .populate({
        path: "employer",
        select: "profileImage name email",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("getAllJobs error:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};

// ============================
// GET JOBS BY DISTANCE
// ============================
const getNearbyJobs = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and Longitude required"
      });
    }

    const radiusInMeters = parseInt(maxDistance, 10) || 50000;

    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              Number(longitude),
              Number(latitude)
            ]
          },
          distanceField: "distance",
          maxDistance: radiusInMeters,
          spherical: true,
          query: {
            jobStatus: "active",
            isActive: true
          }
        }
      },
      {
        $lookup: {
          from: "users", // the underlying collection name for User model
          localField: "employer",
          foreignField: "_id",
          as: "employer"
        }
      },
      {
        $unwind: {
          path: "$employer",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { distance: 1 }
      }
    ]);

    res.status(200).json(jobs);

  } catch (error) {
    console.error("GEO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// ============================
// GET SINGLE JOB (PUBLIC)  
// ============================
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "employer",
      select: "profileImage name email",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};

const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

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
    if (job.applicants.some((id) => id.toString() === req.user.userId)) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    job.applicants.push(req.user.id);
    await job.save();

    res.status(200).json({
      message: "Job applied successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to apply job",
      error: error.message,
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
  getEmployerJobs,
  getNearbyJobs,
};
