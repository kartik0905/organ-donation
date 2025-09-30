const Donor = require("../models/donor.models.js");
const User = require("../models/user.models.js");

exports.addDonor = async (req, res) => {
  const { fullName, bloodGroup, organToDonate, contactInfo } = req.body;

  try {
    const newDonor = new Donor({
      fullName,
      bloodGroup,
      organToDonate,
      contactInfo,
      registeredBy: req.user.id,
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
    const donors = await Donor.find().populate("registeredBy", [
      "hospitalName",
      "email",
    ]);
    res.json(donors);
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
    let donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ msg: "Donor not found" });
    }

    if (
      donor.registeredBy.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
