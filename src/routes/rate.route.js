const router = require("express").Router();

const rate_controller = require("../controllers/rate.controller");

router.get("/", rate_controller.findAll);
router.get("/:id", rate_controller.findOne);
router.delete("/", rate_controller.deleteAll);
router.delete("/:id", rate_controller.delete);

module.exports = router;