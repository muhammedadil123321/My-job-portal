const EmployerProfile = require("../models/EmployerProfile");
const User = require("../models/User");

// CREATE or UPDATE employer profile
exports.saveEmployerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      businessName,
      phoneNumber,
      district,
      state,
      address,
      aboutCompany,
      profileImage,
    } = req.body;

    // Validation
    if (
      !businessName?.trim() ||
      !phoneNumber?.trim() ||
      !district?.trim() ||
      !state?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({
        message:
          "Business name, phone number, district, state, and address are required",
      });
    }

    // Save employer profile ONLY
    const profile = await EmployerProfile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        businessName: businessName.trim(),
        phoneNumber: phoneNumber.trim(),
        district: district.trim(),
        state: state.trim(),
        address: address.trim(),
        aboutCompany: aboutCompany?.trim() || "",
        profileImage: profileImage || "",
      },
      {
        new: true,
        upsert: true,
      }
    );

    // Update ONLY profileImage in User collection (NOT name)
    if (profileImage) {
      await User.findByIdAndUpdate(userId, {
        profileImage: profileImage,
      });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.error("Employer profile save error:", error);
    res.status(500).json({
      message: "Server error while saving employer profile",
    });
  }
};


// GET logged-in employer profile
exports.getMyEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Employer profile not found",
      });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.error("Employer profile fetch error:", error);
    res.status(500).json({
      message: "Server error while fetching employer profile",
    });
  }
};
