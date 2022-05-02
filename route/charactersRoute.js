var express = require("express");
var router = express.Router();
const controller = require("../controller/charactersController");

router.get("/", controller.getAll);

router.post("/", controller.add);

router.put("/:characterId", controller.update);

router.delete("/:characterId", controller.delete);

router.get("/:characterId", controller.get);

module.exports = router;
