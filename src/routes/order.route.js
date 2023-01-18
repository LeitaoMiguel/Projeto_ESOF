const router = require("express").Router();

const order_controller = require("../controllers/order.controller");

//const category_validation = require('../validation/auth.validation.js');

router.post("/", order_controller.create);
router.get("/", order_controller.findAll);
router.get("/:id", order_controller.findOne);
router.delete("/:id", order_controller.delete);

/*
router.get("/:id", posts.findOne);
router.put("/:id", posts.update);
router.delete("/:id", posts.delete);
router.delete("/", posts.deleteAll);
*/

module.exports = router;