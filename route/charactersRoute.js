var express = require("express");
var router = express.Router();
const controller = require("../controller/charactersController");

router.get("/", controller.getAll);

router.post("/", controller.add);

router.delete("/:characterfullName", controller.delete);

router.get("/:characterfullName", controller.get);

module.exports = router;
