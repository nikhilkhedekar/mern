const mongoose = require("mongoose");

const UploadImage = new mongoose.Schema({
    name: { type: String, required: true, default: "file1.jpg" },
    type: { type: String, required: true, default: "image/jpeg" },
    size: { type: String, required: true, default: "3114 kB" },
});

module.exports = mongoose.model("UploadImage", UploadImage);