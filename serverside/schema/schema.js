const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        length: 20,
    },
    price: {
        type: Number,
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model("Product", postSchema);