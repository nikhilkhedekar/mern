const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const mainRoute = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(cors());

//encodeURIComponent
//createConnection("mongodb://localhost:27017")
//ssl: true
//sslValidation: false
mongoose.connect("mongodb+srv://nikhilkhedekar:Abcd%401234@mernstack.ppizwtc.mongodb.net/mernStack?retryWrites=true&w=majority")
.then(res => {
    // console.log("MongoDB", res);
});

mongoose.connection.on("error", (error) => {
    console.log("mongooseError", error);
});

app.get("/", (req, res) => {
    res.send("listening on 8080");
}).listen(8080, () => {
    console.log("listening on 8080");
});

app.use(mainRoute);

module.exports = app