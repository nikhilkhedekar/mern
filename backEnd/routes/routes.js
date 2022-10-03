const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const router = express.Router();
// const upload = multer({ dest: "uploads/" });
const path = require("path");

const { homePage, postUserDetails, uploadImage } = require('../controllers/controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');// use "uploads/" to create new folder if else folder already exists then use "/uploads/" absulute path 
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
    storage,
    fileFilter
  });

router.get('/', homePage);
router.post('/userData', upload.single("image"), postUserDetails);
router.post("/uploadImage", uploadImage);

module.exports = {
    router
}