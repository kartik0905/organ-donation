const Recipient = require("../models/recipient.models.js");

exports.addRecipient = async (req, res) => {
  const { fullName, bloodGroup, organNeeded, contactInfo } = req.body;
  try {
    const newRecipient = new Recipient({
      fullName,
      bloodGroup,
      organNeeded,
      contactInfo,
      registeredBy: req.user.id,
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
    const recipients = await Recipient.find().populate("registeredBy", [
      "hospitalName",
      "email",
    ]);
    res.json(recipients);
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
  const { status } = req.body;
  try {
    let recipient = await Recipient.findById(req.params.id);
    if (!recipient) {
      return res.status(404).json({ msg: "Recipient not found" });
    }
    if (
      recipient.registeredBy.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    recipient = await Recipient.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
