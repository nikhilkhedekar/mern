const express = require("express")

const router = express.Router();

const {
  prices,
  createSubscription,
  subscriptionStatus,
  subscriptions,
  customerPortal,
} = require("../controllers/subs");
const { authenticateUser } = require("../middlewares");

router.get("/prices", prices);
router.post("/create-subscription", authenticateUser, createSubscription);
router.get("/subscription-status", authenticateUser, subscriptionStatus);
router.get("/subscriptions", authenticateUser, subscriptions);
router.get("/customer-portal", authenticateUser, customerPortal);

module.exports = router;
