const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema(
  {
    // Link profile to logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
      max: 65,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    education: {
      type: String,
      required: true,
      trim: true,
    },

    languages: {
      type: [String],
      required: true,
      default: [],
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    // Address broken into structured fields
    area: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    // profile image (stored as URL or base64 string)
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
