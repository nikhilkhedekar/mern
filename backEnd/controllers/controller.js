const userData = require('../schema/schema');
const jwt = require('jsonwebtoken');
const fs = require("fs");

exports.homePage = (req, res) => {
    res.send('listening on 8080');
}

exports.postUserDetails = (req, res) => {
    console.log("reqBody",  fs.readFileSync("uploads/" + req.file.originalname));
    const postedData =  userData.create({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        contactNo: req.body.contactNo,
        // image: {
        //     data: fs.readFileSync("uploads/" + req.file.originalname),
        //     contentType: req.file.mimetype
        // }
        // image: {
        //     name: req.file.originalname,
        //     type: req.file.mimetype,
        //     size: req.file.size,
        //     base64: req.file.data,
        // }
    });
    console.log('postedData', postedData);
    const message = {
        status: 'successful',
        payload: postedData,
    }
    res.status(201).json({
        message
    })
}

exports.uploadImage = async (req, res) => {
    console.log(req.files);
    if (!req.files) {
        throw new Error('No File Uploaded');
      }
      const productImage = req.files.image;
    
      if (!productImage.mimetype.startsWith('image')) {
        throw new Error('Please Upload Image');
      }
    
      const maxSize = 1024 * 1024;
    
      if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError(
          'Please upload image smaller than 1MB'
        );
      }
    
      const imagePath = path.join(
        __dirname,
        '../uploads/' + `${productImage.name}`
      );
      await productImage.mv(imagePath);
      res.status(201).json({ image: `done` });
}