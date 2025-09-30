const express = require("express");
const router = express.Router();
const {
  findMatchesForRecipient,
} = require("../controllers/matching.controllers.js");
const { protect, authorize } = require("../middleware/auth.middleware.js");

router.get(
  "/:recipientId",
  protect,
  authorize("Hospital", "Admin"),
  findMatchesForRecipient
);

module.exports = router;
