const Recipient = require("../models/recipient.models.js");

exports.addRecipient = async (req, res) => {
  const { fullName, bloodGroup, organNeeded, contactInfo } = req.body;
  try {
    const existingProfile = await Recipient.findOne({ user: req.user.id });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: "A recipient profile already exists for this user." });
    }
    const newRecipient = new Recipient({
      fullName,
      bloodGroup,
      organNeeded,
      contactInfo,
      user: req.user.id, 
    });
    const recipient = await newRecipient.save();
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find().populate("user", [
      "email",
      "role",
    ]);
    res.json(recipients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// For a logged-in Recipient to get their own profile
exports.getMyRecipientProfile = async (req, res) => {
  try {
    const recipientProfile = await Recipient.findOne({ user: req.user.id });
    if (!recipientProfile) {
      return res
        .status(404)
        .json({ msg: "No recipient profile found for this user." });
    }
    res.json(recipientProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getRecipientById = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) {
      return res.status(404).json({ msg: "Recipient not found" });
    }
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updateRecipientStatus = async (req, res) => {
  if (!req.body || !req.body.status) {
    return res
      .status(400)
      .json({ msg: "Status is required in the request body." });
  }
  const { status } = req.body;
  try {
    const recipient = await Recipient.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!recipient) {
      return res.status(404).json({ msg: "Recipient not found" });
    }
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
