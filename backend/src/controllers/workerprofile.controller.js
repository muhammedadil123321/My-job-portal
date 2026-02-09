const WorkerProfile = require("../models/WorkerProfile");

// CREATE or UPDATE worker profile
exports.saveWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const {
      fullName,
      age,
      email,
      phoneNumber,
      education,
      languages,
      skills,
      city,
      state,
      address,
    } = req.body;

    // simple validation
    if (
      !fullName ||
      !age ||
      !email ||
      !phoneNumber ||
      !education ||
      !languages ||
      !skills ||
      !city ||
      !state ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // create or update profile
    const profile = await WorkerProfile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        fullName,
        age,
        email,
        phoneNumber,
        education,
        languages,
        skills,
        city,
        state,
        address,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Worker profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET logged-in user's profile
exports.getMyWorkerProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
