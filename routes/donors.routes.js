const express = require("express");
const router = express.Router();
const {
  addDonor,
  getDonors,
  getDonorById,
  updateDonorStatus,
  getMyDonorProfile,
} = require("../controllers/donor.controllers.js");
const { protect, authorize } = require("../middleware/auth.middleware.js");


router.post("/", protect, authorize("Donor", "Hospital", "Admin"), addDonor);


router.get("/", protect, authorize("Admin"), getDonors);


router.get("/profile/me", protect, authorize("Donor"), getMyDonorProfile);


router.get("/:id", protect, authorize("Admin", "Hospital"), getDonorById);


router.put(
  "/status/:id",
  protect,
  authorize("Hospital", "Admin"),
  updateDonorStatus
);

module.exports = router;
