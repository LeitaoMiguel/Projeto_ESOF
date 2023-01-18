const router = require("express").Router();

const address_controller = require("../controllers/address.controller");
const address_validation = require("../validation/address.validation");

//const product_validation = require('../validation/auth.validation.js');

router.post("/", address_validation.create, address_controller.create);
router.get("/", address_controller.findAll);
router.get("/:id", address_controller.findOne);
router.delete("/:id", address_controller.delete);

/* validation_middleware.validJWTNeeded */

/*
router.get("/:id", posts.findOne);
router.put("/:id", posts.update);
router.delete("/:id", posts.delete);
router.delete("/", posts.deleteAll);
*/

module.exports = router;