var express = require("express");
var router = express.Router();
const controller = require("../controller/mainController");

router.get("/api/anilist", controller.get);

module.exports = router;
