const router = require("express").Router();

const product_controller = require("../controllers/product.controller");
const product_validation = require("../validation/product.validation");

const photo_middleware = require("../middlewares/photo.middleware");

const multer  = require('multer')
var path = require('path')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });


router.post("/", product_validation.create, upload.single('photo'), photo_middleware.addToDB, product_controller.create);
router.get("/", product_controller.findAll);
router.get("/:id", product_controller.findOne);
router.delete("/", product_controller.deleteAll);
router.delete("/:id", product_controller.delete);

router.get('/:productId/picture', product_controller.getPhoto);

// PRODUCT RATING
router.get('/:productId/rate', product_controller.getRatings);
router.post('/:productId/rate', product_controller.addRating);

module.exports = router;