const router = require("express").Router();

const cart_controller = require("../controllers/cart.controller.js");

const cart_validation = require('../validation/cart.validation.js');

const role_middleware = require("../middlewares/role.middleware");

router.get("/", cart_controller.findAll);
router.get("/:id", role_middleware.user, cart_controller.findOne);
//router.put("/:id", role_middleware.user, cart_controller.update);
router.delete("/:id", cart_controller.delete);

/*
router.put("/:id", posts.update);
router.delete("/:id", posts.delete);
router.delete("/", posts.deleteAll);
*/

module.exports = router;