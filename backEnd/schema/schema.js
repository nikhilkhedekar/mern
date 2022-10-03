const mongoose = require('mongoose');

let userData = new mongoose.Schema({
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
    },
    image: {
        type: String,
    }
});

// userData.virtual('coverImagePath').get(function (){
//     if(this.image != null && this.imageType != null){
//         return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`;
//     }
// })

module.exports = mongoose.model('UserData', userData);