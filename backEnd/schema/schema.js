const mongoose = require('mongoose');

let postData = mongoose.Schema({
    body: {
        userName: {
            type: String,
            length: 20,
        },
        userEmail: {
            type: String,
            length: 20,
        },
        contactNo: {
            type: Number,
            length: 10,
        }
    }
});

module.exports = mongoose.model('PostData', postData);