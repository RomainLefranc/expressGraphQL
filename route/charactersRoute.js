var express = require("express");
var router = express.Router();
const controller = require("../controller/charactersController");

router.get("/", controller.getAll);

router.post("/", controller.add);

router.delete("/:characterId", controller.delete);

module.exports = router;
