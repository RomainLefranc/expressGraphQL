var express = require("express");
var router = express.Router();
const controller = require("../controller/graphQLController");

router.post("/getAll", controller.getAll);

module.exports = router;
