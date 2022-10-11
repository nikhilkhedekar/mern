const User = require("../models/user");
const stripe = require("stripe")("sk_test_51LWdcqSJ4PPLl4fcR8WOx1SXMYdvKIhqu1pw4AwhSZ5BUjJLLR5gdgxx5XmA7r6vdL69RuOJW5eX6ftQGwj8Nutk009c24biXz");

exports.prices = async (req, res) => {
  const prices = await stripe.prices.list();
  //   console.log("prices", prices);
  res.json(prices.data.reverse());
};

exports.createSubscription = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.findById(req.user._id);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          // quantity: 1,//allow only when product price is not metered
        },
      ],
      customer: user.stripe_customer_id,
      success_url: "http://localhost:3000/stripe/success",
      cancel_url: "http://localhost:3000/stripe/cancel",
    });
    console.log("checkout session", session);
    res.json(session);
  } catch (err) {
    console.log(err);
  }
};

exports.subscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        subscriptions: subscriptions.data,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

exports.subscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    res.json(subscriptions);
  } catch (err) {
    console.log(err);
  }
};

exports.customerPortal = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: "http://localhost:3000/stripe/success",
    });
    res.json(portalSession.url);
  } catch (err) {
    console.log(err);
  }
};
