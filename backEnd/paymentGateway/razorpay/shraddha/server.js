const express = require('express');
const Razorpay = require('razorpay');

const app = express();

const rzp = new Razorpay({
    key_id: "rzp_test_veWT36NaPk8FUB",
    key_secret: "p07yY5Z32x591oQ2poiJ6PrV"
    // key_id: "rzp_live_2KaXmLXflQ62n2",
    // key_secret: "HvWAqvrm8VKPRMeK65VpOeUM"
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send({ paymentGateway: "Razorpay", razorpay: rzp });
});

//Create the order and send the order id back for checkout
app.post("/makeOrder", async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        const currency = req.body.currency;
        const rzpOrder = await rzp.orders.create({
            amount: amount * 100, // rzp format with paise
            currency,//"INR"
            receipt: "receipt#1", //Receipt no that corresponds to this Order,
            payment_capture: true,
            notes: {
                orderType: "Pre"
            } //Key-value pair used to store additional information
        });
        res.status(201).json({ ...rzpOrder });
    } catch (error) {
        res.json({ Error: error });
    }
})

//create plan for subscription
app.post("/selectPlan", async (req, res) => {
    try {
        const { name, amount, currency, description } = req.body;
        const rzpPlan = await rzp.plans.create({
            period: "weekly",
            interval: 1,
            item: {
                name,
                amount,
                currency,
                description
            },
            notes: {
                notes_key_1: "Tea, Earl Grey, Hot",
                notes_key_2: "Tea, Earl Grey… decaf."
            }
        });
        res.status(201).json({ ...rzpPlan });
    } catch (error) {
        res.json({ Error: error });
    }
})

// To create recurring subscription
app.post("/subscribe", async (req, res) => {
    try {
        const { plan_id, total_count, quantity, customer_notify, notes } = req.body;
        const subscription = await rzp.subscriptions.create({ plan_id, total_count, quantity, customer_notify, notes });
        res.status(201).json({ ...subscription });
    } catch (error) {
        res.json({ Error: error });
    }
})



app.listen(8080, () => {
    console.log("listening on 8080");
});