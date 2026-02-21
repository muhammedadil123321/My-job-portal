const WorkerProfile = require("../models/Workerprofile");
const User = require("../models/User"); // ✅ ADD THIS

// CREATE or UPDATE worker profile
exports.saveWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      age,
      phoneNumber,
      education,
      languages,
      skills,
      city,
      state,
      address,
      about,
      profileImage,
    } = req.body;

    // Validation
    if (
      !fullName?.trim() ||
      !phoneNumber?.trim() ||
      !education?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !address?.trim() ||
      !Array.isArray(languages) || languages.length === 0 ||
      !Array.isArray(skills) || skills.length === 0 ||
      !age || age < 18
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Update or create WorkerProfile
    const profile = await WorkerProfile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        fullName,
        age,
        phoneNumber,
        education,
        languages,
        skills,
        city,
        state,
        address,
        about: about || "",
        profileImage: profileImage || "",
      },
      { new: true, upsert: true }
    );

    // ✅ IMPORTANT: Also update User collection
    await User.findByIdAndUpdate(userId, {
      name: fullName,
      profileImage: profileImage || "",
    });

    res.status(200).json(profile);

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
