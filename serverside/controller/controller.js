const {DUMMY_DB} = require("../db/dummyDB");
let dummyData = DUMMY_DB;

exports.getSchema =  async(req, res) => {
    try {
        await res.status(200).json({
            message: "Successfull",
            data: dummyData
        });
    } catch (err) {
        alert({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.postSchema = (req, res) => {
    try {
        dummyData.push(req.body);
    res.status(201).json({
        message: "Successfull",
            data: dummyData
    });
    } catch (error) {
        alert({
            message: err.message,
            errorCode: err.code
        })
    }
}

exports.deleteSchema = (req, res) => {
    try {
        dummyData.filter(data.id !== req.body.id);
    res.json({
        message: "Successfull",
            data: dummyData
    });
    } catch (error) {
        alert({
            message: err.message,
            errorCode: err.code
        })
    }
}