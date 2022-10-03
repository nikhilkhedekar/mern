const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const route = require('./routes/routes');

const app = express();
app.use(express.json());
// parse application/json, basically parse incoming Request Object as a JSON Object 
// app.use(express.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
// app.use(express.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(fileUpload());
app.use(cors())
app.use(cookieParser("secret"));
app.use(express.static('uploads'));

mongoose.connect('mongodb+srv://Dhungel:Dhungel@awsdhungel.oevqe.mongodb.net/AWSDhungel?retryWrites=true&w=majority');
// mongoose.connect("mongodb://127.0.0.1:27017/firstDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4")
// .then(resp => console.log("resp", resp))

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

app.use(route.router)

app.listen(8080, () => {
    console.log("listening")
});

module.exports = {
    app
}
