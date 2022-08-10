<<<<<<< HEAD
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const route = require('./routes/routes');

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

mongoose.connect('mongodb+srv://Dhungel:Dhungel@awsdhungel.oevqe.mongodb.net/AWSDhungel?retryWrites=true&w=majority').then(res => {
    console.log("mongoRes", res)
})

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
=======
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const route = require('./routes/routes');

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

mongoose.connect('').then(res => {
    console.log("mongoRes", res)
})

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
>>>>>>> dda240ea25b477e96fb3bfadaa06438eafb47fbc
