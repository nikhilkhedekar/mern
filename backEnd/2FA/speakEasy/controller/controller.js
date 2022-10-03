const speakeasy = require('speakeasy');

const userSchema = require('../models/userModel');

exports.homePage = (req, res) => {
    res.send("hello speak easy");
};

exports.registerUser = async (req, res) => {
    try {
        const { ascii, hex, base32, otpauth_url } = speakeasy.generateSecret()
        const newUser = await userSchema.create({
            temp_secret: { ascii, hex, base32, otpauth_url }
        });
        res.json({ newUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error generating secret key' })
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const user = await userSchema.find({
            _id: req.body.userId
        });
        const { base32: secret } = user[0].temp_secret;
        console.log({ secret, token: req.body.token });
        const token = speakeasy.totp({
            secret,
            encoding: 'base32',
        });
        console.log("token", token);
        res.json({ token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' })
    };
};

exports.validateUser = async (req, res) => {
    try {
        const user = await userSchema.find({
            _id: req.body.userId
        });
        const { base32: secret } = user[0].temp_secret;
        console.log({ secret, token: req.body.token });        
        const tokenValidates = speakeasy.totp.verify({
            secret, 
            encoding: 'base32',
            token: req.body.token,
            window: 0 //0 window will give 30 sec to validate user 
            // 1 window will add extra 30 sec to window to expire
        });
        console.log("verified", tokenValidates);
        if (tokenValidates) {
            user[0].verified = true;
            user.save();
            res.json({ validated: true });
            setTimeout(() => {
                user[0].verified = false;
            }, 30000);
            user.save();
        } else {
            res.json({ validated: false })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' })
    };
};