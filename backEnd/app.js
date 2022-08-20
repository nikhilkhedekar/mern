const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const route = require('./routes/routes');

const app = express();
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded());
app.use(cors())
app.use(cookieParser("secret"));

mongoose.connect('mongodb+srv://Dhungel:Dhungel@awsdhungel.oevqe.mongodb.net/AWSDhungel?retryWrites=true&w=majority');

mongoose.connection.on('error', error => {
    console.log("error", error)
})

//by simple getPost method

// app.get('/', (req, res) => {
//     res.send('listening on 8080');
// }).listen(8080, () => {
//     console.log('listening on 8080');
// })

// app.post('/postData', (req, res) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: "Data Fetched",
//         data: req.body
//     })
// })

//with router

app.use(route.router).listen(8080);

module.exports = { 
    app
}
