const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // Basic Info
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

    responsibilities: [
      {
        type: String,
      },
    ],

    requiredSkills: [
      {
        type: String,
      },
    ],

    // Job Nature
    jobType: {
      type: String,
      enum: ["part-time", "hourly", "weekend-time", "season-time"],
      required: true,
    },

    jobStatus: {
      type: String,
      enum: ["active", "pending", "blocked", "rejected"],
      default: "pending",
    },

    // Working Time
    workingTimeStart: {
      type: String, // "HH:mm"
    },
    workingTimeEnd: {
      type: String,
    },

    // Salary
    salaryMin: {
      type: Number,
    },
    salaryMax: {
      type: Number,
    },
    salaryType: {
      type: String,
      enum: ["hourly", "daily", "monthly"],
    },

    // Location
    city: String,
    state: String,
    country: String,
    workplaceAddress: String,

    location: {
      latitude: Number,
      longitude: Number,
    },

    // Relations
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

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
