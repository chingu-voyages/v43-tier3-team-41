const router = require("express").Router();

const cartCTRL = require("../controllers/cart.controller");

const { isAuth } = require("../middlewares/authentication");

router.post("/add", cartCTRL.addToCart);
router.post("/add/:cartId", cartCTRL.addToCart);
router.get("/:cartId", cartCTRL.getCart);

module.exports = router;