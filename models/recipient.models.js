const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  organNeeded: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Waiting", "Matched", "Transplanted"],
    default: "Waiting",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipient", RecipientSchema);
