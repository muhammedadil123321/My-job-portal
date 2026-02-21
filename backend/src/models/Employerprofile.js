const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema(
  {
    // Link profile to logged-in employer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per employer
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
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

    address: {
      type: String,
      required: true,
      trim: true,
    },

    aboutCompany: {
      type: String,
      default: "",
      trim: true,
    },

    // Profile image (logo or business photo)
    profileImage: {
      type: String, // store image URL (recommended)
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployerProfile", employerProfileSchema);
