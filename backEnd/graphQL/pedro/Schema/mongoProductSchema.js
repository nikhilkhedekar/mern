const { default: mongoose } = require("mongoose");

const Products = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customers",
    }
});

module.exports = mongoose.model("Products", Products);
