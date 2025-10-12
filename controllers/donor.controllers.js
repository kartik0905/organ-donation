const Donor = require("../models/donor.models.js");


exports.addDonor = async (req, res) => {
  const { fullName, bloodGroup, organToDonate, contactInfo } = req.body;
  try {
    const existingProfile = await Donor.findOne({ user: req.user.id });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: "A donor profile already exists for this user." });
    }
    const newDonor = new Donor({
      fullName,
      bloodGroup,
      organToDonate,
      contactInfo,
      user: req.user.id, 
    });
    const donor = await newDonor.save();
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("user", ["email", "role"]);
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getMyDonorProfile = async (req, res) => {
  try {
    const donorProfile = await Donor.findOne({ user: req.user.id });
    if (!donorProfile) {
      return res
        .status(404)
        .json({ msg: "No donor profile found for this user." });
    }
    res.json(donorProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ msg: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updateDonorStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!donor) {
      return res.status(404).json({ msg: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
