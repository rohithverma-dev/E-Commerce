const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);  // done
router.route("/payment/process").post(isAuthenticatedUser, processPayment);  // done

module.exports = router;
