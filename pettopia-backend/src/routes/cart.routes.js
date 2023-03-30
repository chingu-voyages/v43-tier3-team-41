const router = require("express").Router();

const cartCTRL = require("../controllers/cart.controller");

const { isAuth } = require("../middlewares/authentication");

router.post("/add/:productId", cartCTRL.addToNewCart);
router.post("/:id/add/:productId", cartCTRL.addToCart);
router.post("/:id/remove/:productId", cartCTRL.removeProductFromCart);
router.get("/:cartId", cartCTRL.getCart);

module.exports = router;