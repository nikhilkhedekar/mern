const postData = require('../schema/schema');
const jwt = require('jsonwebtoken');
const fs = require("fs");

exports.homePage = (req, res) => {
    res.send('listening on 8080');
}

exports.postUserDetails = async (req, res) => {    
    console.log("reqBody", req.file)
    const postedData = await postData({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        contactNo: req.body,contactNo,
        image: {
            data: fs.readFileSync("uploads/" + req.file.originalname),
            contentType: req.file.mimetype
        }
    }).save();
    console.log('postedData', postedData);
    const message = {
        status: 'successful',
        payload: postedData,
    }
    res.status(201).json({
        message
    })
}
