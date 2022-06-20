const express = require('express');

const { homePage, postUserDetails } = require('../controllers/controller');

const router = express.Router();

router.get('/', homePage);
router.post('/postData', postUserDetails);

module.exports = {
    router
}