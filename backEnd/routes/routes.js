const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

const { homePage, postUserDetails } = require('../controllers/controller');

const router = express.Router();

router.get('/', homePage);
router.post('/postData', upload.single("image"), postUserDetails);

module.exports = {
    router
}