const router = require("express").Router();

const path = require("path");

const { validateToken } = require('../utils/jwt');

//Define our routers here
router.get('/', (req, res) => {
    res.send("Nothing to do here :)");
});

router.use('/auth', require("./auth.route"));
router.use('/user', require("./user.route"));
router.use('/category', require("./category.route"));
router.use('/product', require("./product.route"));
router.use('/address', require("./address.route"));
router.use('/order', require("./order.route"));
router.use('/cart', require("./cart.route"));
router.use('/rate', require("./rate.route"));


router.get('/uploads/:id', (req, res) => {
    let indexPath = path.join(__dirname, `../uploads/${req.params.id}`);
    res.sendFile(indexPath);
});

router.get('/checkToken', (req, res) => {
    try {
        tokenPayload = validateToken(req.headers.authorization);
    }
    catch(errors) {
        return res.status(400).json({ errors: errors });
    }
    
    res.status(200).send({});
});

module.exports = router;