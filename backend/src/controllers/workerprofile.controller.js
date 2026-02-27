const WorkerProfile = require("../models/Workerprofile");
const User = require("../models/User");

// CREATE or UPDATE worker profile
exports.saveWorkerProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("[saveWorkerProfile] req.user is missing");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const {
      fullName,
      age,
      phoneNumber,
      education,
      languages,
      skills,
      area,
      district,
      state,
      pincode,
      about,
      profileImage,
    } = req.body;

    console.log("[saveWorkerProfile] Incoming body:", req.body);

    // 🔹 Get existing profile first
    const existingProfile = await WorkerProfile.findOne({ user: userId });

    // 🔹 Only validate fully when creating profile for first time
    if (!existingProfile) {
      const errors = [];

      if (!fullName || !fullName.trim()) errors.push("fullName");
      if (!phoneNumber || !phoneNumber.trim()) errors.push("phoneNumber");
      if (!education || !education.trim()) errors.push("education");
      if (!area || !area.trim()) errors.push("area");
      if (!district || !district.trim()) errors.push("district");
      if (!state || !state.trim()) errors.push("state");
      if (!pincode || !pincode.trim()) errors.push("pincode");

      if (!Array.isArray(languages) || languages.length === 0) {
        errors.push("languages");
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        errors.push("skills");
      }

      if (!age || Number(age) < 18) {
        errors.push("age");
      }

      if (errors.length > 0) {
        console.warn("[saveWorkerProfile] Validation failed:", errors);
        return res.status(400).json({
          message: "Validation failed",
          invalidFields: errors,
        });
      }
    }

    // 🔹 Normalize safely (use existing values if not provided)
    const normalizedLanguages = Array.isArray(languages)
      ? languages.map((l) => String(l).trim())
      : existingProfile?.languages || [];

    const normalizedSkills = Array.isArray(skills)
      ? skills.map((s) => String(s).trim())
      : existingProfile?.skills || [];

    // 🔹 Update profile safely (partial update support)
    const profile = await WorkerProfile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,

        fullName:
          fullName !== undefined
            ? fullName.trim()
            : existingProfile?.fullName,

        age:
          age !== undefined
            ? Number(age)
            : existingProfile?.age,

        phoneNumber:
          phoneNumber !== undefined
            ? phoneNumber.trim()
            : existingProfile?.phoneNumber,

        education:
          education !== undefined
            ? education.trim()
            : existingProfile?.education,

        languages: normalizedLanguages,

        skills: normalizedSkills,

        area:
          area !== undefined
            ? area.trim()
            : existingProfile?.area,

        district:
          district !== undefined
            ? district.trim()
            : existingProfile?.district,

        state:
          state !== undefined
            ? state.trim()
            : existingProfile?.state,

        pincode:
          pincode !== undefined
            ? pincode.trim()
            : existingProfile?.pincode,

        about:
          about !== undefined
            ? String(about).trim()
            : existingProfile?.about,

        profileImage:
          profileImage !== undefined
            ? profileImage
            : existingProfile?.profileImage,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // 🔹 Update User collection safely
    await User.findByIdAndUpdate(userId, {
      name: profile.fullName,
      profileImage: profile.profileImage || "",
    });

    console.log("[saveWorkerProfile] Profile saved for user:", userId);

    return res.status(200).json({
      message: "Worker profile saved successfully",
      profile,
    });

  } catch (error) {
    console.error("[saveWorkerProfile] Server error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// GET logged-in user's profile
exports.getMyWorkerProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("[getMyWorkerProfile] req.user is missing");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await WorkerProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json(profile);

  } catch (error) {
    console.error("[getMyWorkerProfile] Server error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};