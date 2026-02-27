const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
  /* JOB reference */
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  /* WORKER reference */
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  /* Worker snapshot (existing — KEEP unchanged) */
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  education: {
    type: String,
    required: true,
  },

  skills: {
    type: [String],
    default: [],
  },

  languages: {
    type: [String],
    default: [],
  },

  about: {
    type: String,
    default: "",
  },


  /*
  ========================================
  JOB SNAPSHOT (NEW FIELD — SAFE ADD)
  ========================================
  This stores permanent copy of job data
  so history works even if job is deleted
  */
  jobSnapshot: {

    jobTitle: {
      type: String,
      default: null
    },

    workPlaceName: {
      type: String,
      default: null
    },

    jobSummary: {
      type: String,
      default: null
    },

    requiredSkills: {
      type: [String],
      default: []
    },

    responsibilities: {
      type: [String],
      default: []
    },

    salaryMin: {
      type: Number,
      default: null
    },

    salaryMax: {
      type: Number,
      default: null
    },

    salaryType: {
      type: String,
      default: null
    },

    jobType: {
      type: String,
      default: null
    },

    workplaceAddress: {
      type: String,
      default: null
    },

    city: {
      type: String,
      default: null
    },

    district: {
      type: String,
      default: null
    },

    state: {
      type: String,
      default: null
    },

    country: {
      type: String,
      default: null
    },

    workingTimeStart: {
      type: String,
      default: null
    },

    workingTimeEnd: {
      type: String,
      default: null
    }

  },


  /* EXISTING STATUS FIELD — KEEP unchanged */
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },


  /* EXISTING DATE FIELD — KEEP unchanged */
  appliedDate: {
    type: Date,
    default: Date.now,
  },

},
{ timestamps: true }
);


/* EXISTING DUPLICATE PREVENTION — KEEP unchanged */
applicationSchema.index(
  { job: 1, worker: 1 },
  { unique: true }
);


module.exports = mongoose.model("Application", applicationSchema);