const express = require("express");
const router = express.Router();
const {
  addRecipient,
  getRecipients,
  getMyRecipientProfile,
  getRecipientById,
  updateRecipientStatus,
} = require("../controllers/recipient.controllers.js");
const { protect, authorize } = require("../middleware/auth.middleware.js");


router.post(
  "/",
  protect,
  authorize("Recipient", "Hospital", "Admin"),
  addRecipient
);


router.get("/", protect, authorize("Admin"), getRecipients);


router.get(
  "/profile/me",
  protect,
  authorize("Recipient"),
  getMyRecipientProfile
);


router.get("/:id", protect, authorize("Admin", "Hospital"), getRecipientById);


router.put(
  "/status/:id",
  protect,
  authorize("Hospital", "Admin"),
  updateRecipientStatus
);

module.exports = router;
