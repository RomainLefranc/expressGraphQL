var express = require("express");
var router = express.Router();
const controller = require("../controller/graphQLController");

router.post("/getAll", controller.getAll);

router.get("/getByAnime/:search", controller.getByAnime);

router.get("/getRandom", controller.getRandom);

module.exports = router;
