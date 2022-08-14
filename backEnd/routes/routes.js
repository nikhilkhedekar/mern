const express = require('express');
const jwt = require('jsonwebtoken');

const { homePage, postUserDetails } = require('../controllers/controller');

const router = express.Router();

router.get('/', homePage);
router.post('/postData', postUserDetails);
router.get("/getCookie", (req, res) => {
    res.send("sonething")
    console.log("signedCookie", req.cookies)
    console.log("verify", jwt.verify(req.cookies, "secret"))
})

module.exports = {
    router
}