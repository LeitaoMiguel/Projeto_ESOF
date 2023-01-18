const router = require("express").Router();

const auth_controller = require("../controllers/auth.controller");
const auth_validation = require('../validation/auth.validation');

router.post("/login", auth_controller.login);
router.post("/signup", auth_validation.signup, auth_controller.signup);

module.exports = router;