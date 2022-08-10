const express = require("express");
const controller = require("../controller/controller")
const mongoController = require("../controller/mongoController")

const routes = express.Router();

routes.get("/getSchema", controller.getSchema);
routes.post("/postSchema", controller.postSchema);
routes.delete("/deleteSchema", controller.deleteSchema);
routes.post("/postMongoSchema", mongoController.postMongoSchema);
routes.get("/getMongoSchema", mongoController.getMongoSchema);
routes.get("/getOneMongoSchema/:id", mongoController.getOneMongoSchema);
routes.post("/updateOneMongoSchema/:id", mongoController.updateOneMongoSchema);
routes.delete("/deleteOneMongoSchema", mongoController.deleteOneMongoSchema);

module.exports = routes