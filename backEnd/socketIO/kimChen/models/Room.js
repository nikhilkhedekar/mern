const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;