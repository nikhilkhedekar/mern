const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    room_id: {
        type: mongoose.Types.ObjectId,
        ref: "Rooms",
        required: true
    },
}, { timestamps: true })
const Message = mongoose.model('message', messageSchema);
module.exports = Message;