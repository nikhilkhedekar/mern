const postData = require('../schema/schema');

exports.homePage = (req, res) => {
    res.send('listening on 8080');
}

exports.postUserDetails = (req, res) => {
    const postedData = new postData(req.body);
    console.log('postedData', postedData);
    res.status(201).json({
        status: 'successful',
        payload: postedData, 
    });
}