const Application = require("../models/Application");
const Job = require("../models/Job");


/*
========================================
CREATE APPLICATION
POST /api/applications/:jobId
========================================
*/
exports.createApplication = async (req, res) => {

  try {

    const userId = req.user.id;
    const jobId = req.params.jobId;

    const {
      fullName,
      email,
      phoneNumber,
      area,
      district,
      state,
      pincode,
      education,
      skills,
      languages,
      about
    } = req.body;


    /*
    ========================================
    STEP 1 — VALIDATION
    ========================================
    */
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !area ||
      !district ||
      !state ||
      !pincode ||
      !education
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }


    /*
    ========================================
    STEP 2 — CHECK DUPLICATE APPLICATION
    ========================================
    */
    const existingApplication = await Application.findOne({
      job: jobId,
      worker: userId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

// STEP 3 — GET JOB DATA
const jobData = await Job.findById(jobId);

if (!jobData) {
  return res.status(404).json({
    message: "Job not found"
  });
}


// STEP 4 — CREATE APPLICATION WITH SNAPSHOT
const application = await Application.create({

  job: jobId,

  worker: userId,

  fullName,
  email,
  phoneNumber,
  area,
  district,
  state,
  pincode,
  education,

  skills: skills || [],
  languages: languages || [],
  about: about || "",

  jobSnapshot: {

    jobTitle: jobData.jobTitle,

    workPlaceName: jobData.workPlaceName,

    jobSummary: jobData.jobSummary,

    requiredSkills: jobData.requiredSkills || [],

    responsibilities: jobData.responsibilities || [],

    salaryMin: jobData.salaryMin,

    salaryMax: jobData.salaryMax,

    salaryType: jobData.salaryType,

    jobType: jobData.jobType,

    workplaceAddress: jobData.workplaceAddress,

    city: jobData.city,

    district: jobData.district,

    state: jobData.state,

    country: jobData.country,

    workingTimeStart: jobData.workingTimeStart,

    workingTimeEnd: jobData.workingTimeEnd

  },

  status: "pending"

});


    /*
    ========================================
    STEP 5 — RESPONSE
    ========================================
    */
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });


  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};



/*
========================================
GET APPLICATIONS OF LOGGED-IN WORKER
========================================
*/
exports.getMyApplications = async (req, res) => {

  try {

    const userId = req.user.id;

    const applications = await Application.find({
      worker: userId
    })
      .populate("job", "jobTitle workPlaceName city state jobType")
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      applications
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};



/*
========================================
GET APPLICATIONS FOR EMPLOYER
========================================
*/
exports.getEmployerApplications = async (req, res) => {

  try {

    const employerId = req.user.id;

    const jobs = await Job.find({
      employer: employerId
    });

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("worker", "name email profileImage")
      .populate("job", "jobTitle workPlaceName city state jobType")
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};



/*
========================================
UPDATE APPLICATION STATUS
========================================
*/
exports.updateApplicationStatus = async (req, res) => {

  try {

    const employerId = req.user.id;
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const application = await Application.findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (application.job.employer.toString() !== employerId) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      application
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};