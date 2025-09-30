const express = require("express");
const router = express.Router();
const {
  addDonor,
  getDonors,
  getDonorById,
  updateDonorStatus,
} = require("../controllers/donor.controllers.js");
const { protect, authorize } = require("../middleware/auth.middleware.js");

router.post("/", protect, authorize("Hospital", "Admin"), addDonor);
router.get("/", protect, authorize("Admin"), getDonors);
router.get("/:id", protect, getDonorById);
router.put(
  "/status/:id",
  protect,
  authorize("Hospital", "Admin"),
  updateDonorStatus
);

module.exports = router;
