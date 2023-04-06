const router = require("express").Router();

const cartCTRL = require("../controllers/cart.controller");

const { isAuth } = require("../middlewares/authentication");

//router.post("/add/:productId", isAuth,  cartCTRL.addToNewCart);
//router.post("/:id/add/:productId", isAuth, cartCTRL.addToCart);
router.post("/add/:productId", isAuth, cartCTRL.addToCart);
//router.post("/:id/remove/:productId", isAuth, cartCTRL.removeProductFromCart);
router.post("/remove/:productId", isAuth, cartCTRL.removeProductFromCart);
//router.post("/:id/subtract/:productId", isAuth, cartCTRL.subtract);
router.post("/subtract/:productId", isAuth, cartCTRL.subtract);
//router.post("/:id/empty", isAuth, cartCTRL.emptyCart);
router.post("/empty", isAuth, cartCTRL.emptyCart);
//router.get("/:cartId", isAuth,cartCTRL.getCart);
router.get("/", isAuth,cartCTRL.getCart);

module.exports = router;
