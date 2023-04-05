const router = require("express").Router();

const favoriteCTRL = require("../controllers/favorites.controller");

const { isAuth } = require("../middlewares/authentication");

router.post("/add/:productId", favoriteCTRL.addToNewCart);
router.post("/:id/add/:productId", favoriteCTRL.addToCart);
router.post("/:id/remove/:productId", favoriteCTRL.removeProductFromCart);
router.get("/:favoriteId", favoriteCTRL.getCart);

module.exports = router;