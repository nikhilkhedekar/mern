const mongoose = require("mongoose")

const Customers = mongoose.Schema({
    name: { type: String },
    email: { type: String }
});

module.exports = mongoose.model("Customers", Customers);
