const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  stripe_customer_id: String,
  subscriptions: [],
});

module.exports = mongoose.model("User", userSchema);
