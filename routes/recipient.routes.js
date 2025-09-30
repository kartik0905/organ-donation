const express = require("express");
const router = express.Router();
const {
  addRecipient,
  getRecipients,
  getRecipientById,
  updateRecipientStatus,
} = require("../controllers/recipient.controllers.js");
const { protect, authorize } = require("../middleware/auth.middleware.js");

router.post("/", protect, authorize("Hospital", "Admin"), addRecipient);
router.get("/", protect, authorize("Admin"), getRecipients);
router.get("/:id", protect, getRecipientById);
router.put(
  "/status/:id",
  protect,
  authorize("Hospital", "Admin"),
  updateRecipientStatus
);

module.exports = router;
