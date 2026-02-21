const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    workPlaceName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobSummary: {
      type: String,
      required: true,
    },

    responsibilities: [String],

    requiredSkills: [String],

    jobType: {
      type: String,
      enum: ["part-time", "hourly", "weekend-time", "season-time"],
      required: true,
    },

    jobStatus: {
      type: String,
      enum: ["active", "pending", "blocked", "rejected"],
      default: "pending",
      index: true,
    },

    workingTimeStart: String,
    workingTimeEnd: String,

    salaryMin: Number,
    salaryMax: Number,

    salaryType: {
      type: String,
      enum: ["hourly", "daily", "monthly"],
    },

    city: String,
    state: String,
    district: String,
    country: String,
    workplaceAddress: String,

    location: {
      latitude: Number,
      longitude: Number,
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    applicationsCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
