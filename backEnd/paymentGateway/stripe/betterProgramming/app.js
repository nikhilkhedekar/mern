const express = require("express");
const cors = require("cors");

const app = express();
const stripe = require("stripe")(require("./config.json").stripeSecretKey);

app.use(express.json());
app.use(cors());


//================== create customer ======================================================

async function createStripeCustomer({ name, email, phone }) {
  return new Promise(async (resolve, reject) => {
    try {
      const Customer = await stripe.customers.create({
        name,
        email,
        phone,
      });

      resolve(Customer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

app.post("/user/register", async (req, res) => {
  const { email, name, phone } = req.body;

  /*  Add this user in your database and store stripe's customer id against the user   */
  try {
    const customer = await createStripeCustomer({ name, email, phone });
    console.log("stripeCustomer", customer);
    res.status(200).json({ message: "Customer created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "An error occured" });
  }
});

//================ create payment Intent ===================================================

app.post("/payment/create-payment-intent", async (req, res) => {
  const { amount, currency, userCustomerId, type } = req.body;

  /* Query database for getting the payment amount and customer id of the current logged in user */

  // const amount = 1000;
  // const currency = "INR";
  // const userCustomerId = "cus_MGdM2aP7mvWKkR";

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: userCustomerId,
      payment_method_types: type,
      // confirmation_method: "manual", // For 3D Security
      // description: "Buy Product",
    });

    /* Add the payment intent record to your datbase if required */
    res.status(200).json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not create payment");
  }
});

//================ create payment nethod ==========================================

app.use("/payment/method/create", (req, res) => {
  return new Promise( async (resolve, reject) => {
    const { type, card } = req.body;
    try{
      const createPaymentMethod = await stripe.paymentMethods.create({
        type,
        card: {
          number: card.number,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        },
      });
      resolve(createPaymentMethod);
      res.status(200).json(createPaymentMethod);
    } catch (err) {
      reject(err);
    }
  })
})

//=============== attach payment method ==============================================

function attachMethod(customerId, paymentId) {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentMethodAttach = await stripe.paymentMethods.attach(paymentId,
        {customer: customerId})
      resolve(paymentMethodAttach);
    } catch (err) {
      reject(err);
    }
  });
}

app.post("/payment/method/attach", async (req, res) => {
  /* Fetch the Customer Id of current logged in user from the database */
  // const customerId = "cus_MGdM2aP7mvWKkR";
  const customerId = req.body.customer;
  const paymentId = req.body.paymentId;
  try {
    const method = await attachMethod(customerId, paymentId);
    console.log(method);
    res.status(200).json({ message: "Payment method attached succesully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not attach method" });
  }
});

//================ list customer payment methods =========================

async function listCustomerPayMethods(customerId, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(customerId, {
        type,
      });
      resolve(paymentMethods);
    } catch (err) {
      reject(err);
    }
  });
}

app.get("/payment/methods", async (req, res) => {
  /* Query database to fetch Stripe Customer Id of current logged in user */
  console.log("paymentMethod", req.body);
  const customerId = req.body.customer;//"cus_MGdM2aP7mvWKkR"
  const paymentType = req.body.type;//"card"
  
  try {
    const paymentMethods = await listCustomerPayMethods(customerId, paymentType);
    res.status(200).json(paymentMethods);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not get payment methods");
  }
});

//=============== confirm payment methods ==============================

app.post("/payment/confirm", async (req, res) => {
  const { paymentIntent, paymentMethod } = req.body;
  try {
    const intent = await stripe.paymentIntents.confirm(paymentIntent, {
      payment_method: paymentMethod,
    });

    /* Update the status of the payment to indicate confirmation */
    res.status(200).json(intent);
  } catch (err) {
    console.error(err);
    res.status(500).json("Could not confirm payment");
  }
});

app.get("/", (req, res) => {
  res.send("listening on 8080");
}).listen(8080, (err) => {
  if (err) throw err;
  console.log("Server running");
});

module.exports = app;