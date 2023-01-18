const router = require("express").Router();

const user_controller = require("../controllers/user.controller.js");

const role_middleware = require("../middlewares/role.middleware");
const photo_middleware = require("../middlewares/photo.middleware");


const multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/users/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });


router.get("/", /*role_middleware.user, */user_controller.findAll);
router.get("/:userId", role_middleware.user, user_controller.findById);
router.put("/:userId", role_middleware.user, upload.single('photo'), photo_middleware.addToDB, user_controller.update);
router.delete("/:userId", user_controller.delete);

// USER CART ROUTES
router.get("/:userId/cart", role_middleware.user, user_controller.getUserCart);
router.post("/:userId/cart/", role_middleware.user, user_controller.addProductToCart);
router.put("/:userId/cart/:productId", role_middleware.user, user_controller.updateEntryOnCart);
router.delete("/:userId/cart/", role_middleware.user, user_controller.removeAllFromCart);
router.delete("/:userId/cart/:productId", role_middleware.user, user_controller.removeEntryFromCart);

router.get("/:userId/addressess", role_middleware.user, user_controller.getUserAddressess);

router.get('/:userId/picture', user_controller.getPhoto);


module.exports = router;