const express = require("express");
const mongoose = require("mongoose");

const mainRouter = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));
app.use(mainRouter);

mongoose.connect("mongodb://127.0.0.1:27017/firstDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4");
mongoose.connection.on("error", (error) => {
    return new Error(error);
});

app.listen(8080, () => {
    console.log("listening on 8080 ");
});