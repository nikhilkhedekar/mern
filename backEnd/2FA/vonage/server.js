const express = require('express');
const Vonage = require('@vonage/server-sdk')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const vonage = new Vonage({
    apiKey: "c310152d",
    apiSecret: "r7YHX9UsuxUdr4Rj"
});

app.post('/verify', (req, res) => {
    vonage.verify.request({
        number: req.body.number,
        brand: 'ACME Corp'
    }, (error, result) => {
        if (result.status != 0 && result.status != 10) {
            res.json({ message: result.error_text })
        } else {
            res.status(201).json({ requestId: result.request_id })
        }
    })
});

app.post('/validate', (req, res) => {
    vonage.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (error, result) => {
        if (result.status != 0) {
            res.json({ message: result.error_text })
        } else {
            res.status(201).json({ message: "success" });
        }
    })
});

app.post('/sendMessage', (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const text = req.body.text;
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            res.json({ message: err });
        } else {
            if (responseData.messages[0]['status'] === "0") {
                res.json({ message: "Message sent successfully." });
            } else {
                res.json({ message: `Message failed with error: ${responseData.messages[0]['error-text']}` });
            }
        }
    })
})

app.get("/", (req, res) => {
    res.send("vonage vonage 2fa");
});

app.listen(8080, () => {
    console.log("listening on 8080");
})