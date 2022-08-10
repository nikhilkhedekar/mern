const mongoose = require('mongoose');
let mongoSchema = require('../schema/schema');

exports.postMongoSchema = async (req, res) => {
    try {        
        const postedData = await mongoSchema.create(req.body);
        console.log("postedData", postedData);
        res.json({
            message: "successful",
            daata: req.body
        })
    }catch (err) {
        console.log({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.getMongoSchema = async (req, res) => {
    try {
        //mongoSchema = mongoose.model("Product", postSchema) 
        const postSchema = await mongoSchema.find({});
        console.log("getMongoSchema", postSchema);
        res.json({
            message: "Success",
            data: postSchema
        })
    } catch (err) {
        console.log({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.getOneMongoSchema = (req, res) => {
    try {
        let getOneSchema;
        mongoSchema.findOne({ _id: req.params.id }).exec((err, data) => {
            if(err){
                console.log("err", err);               
            }       
            getOneSchema = data;
            console.log("getOneSchema", getOneSchema);
        });        
        res.json({
            message: "Success",
            data: getOneSchema
        })
    } catch (err) {
        console.log({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.updateOneMongoSchema = (req, res) => {
    try{
        mongoSchema.findOneAndUpdate({ _id: req.params.id }, req.body, {new: false}).exec((err, data) => {
            if(err){
                console.log("err", err);               
            } 
            console.log("dataUpdated", data);
        })
        res.json({
            message: "Success",            
        })
    }catch (err) {
        console.log({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.deleteOneMongoSchema = (req, res) => {
    try {
        const resp = mongoSchema.findOneAndDelete({ _id: req.params.id }).exec((err) => {
            if(err){
                console.log("err", err);               
            }             
        });
        res.json({
            message: "Success",            
            response: resp
        })
    }catch (err) {
        console.log({
            message: err.message,
            errorCode: err.code
        })
    }
}