const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, 
  },
  fullName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  organToDonate: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Matched", "Donated"],
    default: "Available",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donor", DonorSchema);
