const express = require("express");
const path = require("path");
const pug = require("pug");

const app = express();

app.set("view engine", pug);
app.set("veiws", path.join(__dirname, "views"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
}).listen(8080, () => {
    console.log("hello pug");
})

module.exports = app