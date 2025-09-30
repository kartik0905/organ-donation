const Donor = require("../models/donor.models.js");
const Recipient = require("../models/recipient.models.js");

exports.findMatchesForRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.recipientId);
    if (!recipient) {
      return res.status(404).json({ msg: "Recipient not found" });
    }

    const potentialMatches = await Donor.find({
      organToDonate: recipient.organNeeded,
      bloodGroup: recipient.bloodGroup,
      status: "Available",
    }).populate("registeredBy", ["hospitalName", "email"]);

    if (potentialMatches.length === 0) {
      return res.status(404).json({ msg: "No compatible donors found." });
    }

    res.json(potentialMatches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
