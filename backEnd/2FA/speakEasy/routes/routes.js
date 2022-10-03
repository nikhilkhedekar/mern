const express = require("express");

const { registerUser, homePage, verifyUser, validateUser } = require("../controller/controller");

const router = express.Router();

router.get("/", homePage);
router.post("/api/register", registerUser);
router.post("/api/verify", verifyUser);
router.post("/api/validate", validateUser);

module.exports = router;