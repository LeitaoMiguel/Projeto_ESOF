const router = require("express").Router();

const category_controller = require("../controllers/category.controller");
const category_validation = require("../validation/category.validation");

const role_middleware = require("../middlewares/role.middleware");
const photo_middleware = require("../middlewares/photo.middleware");

const multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/categories')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });


router.post("/", /*role_middleware.mod,  category_validation.create,*/ upload.single('photo'), photo_middleware.addToDB, category_controller.create);
router.get("/", category_controller.findAll);
router.get("/:id", category_controller.findOne);
router.delete("/:id", /*role_middleware.mod,*/ category_controller.delete);

router.get('/:categoryId/picture', category_controller.getPhoto);


module.exports = router;