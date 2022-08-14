const postData = require('../schema/schema');
const jwt = require('jsonwebtoken');

exports.homePage = (req, res) => {
    res.send('listening on 8080');
}

exports.postUserDetails = (req, res) => {
    const postedData = new postData(req.body);
    console.log('postedData', postedData);
    const message = {
        status: 'successful',
        payload: postedData,
    }
    const secret = jwt.sign({user: "me"}, "secret");
    res.cookie("secret", secret, {
        httpOnly: true,
        secure: true,
        signed: true,
    })
    res.json({secret})
}