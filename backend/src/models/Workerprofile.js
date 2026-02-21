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
    },

    age: {
      type: Number,
      required: true,
    },


    phoneNumber: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    languages: {
      type: [String],
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: "",
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
