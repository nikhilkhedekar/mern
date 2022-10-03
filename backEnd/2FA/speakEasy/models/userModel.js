const mongoose = require("mongoose");

const userModel = new mongoose.Schema({    
    temp_secret: { 
        ascii: { type: String, required: true }, 
        hex: { type: String, required: true }, 
        base32: { type: String, required: true },
        otpauth_url: { type: String, required: true }, 
    },
    verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("UserModel", userModel);