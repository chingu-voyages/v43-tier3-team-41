const router = require("express").Router();

const productCTRL = require("../controllers/product.controller");

const { isAuth } = require("../middlewares/authentication");

router.get("/", productCTRL.getProducts);
router.get("/:productId", productCTRL.getProduct);
//router.post("/", isAuth, productCTRL.createProduct);
router.post("/", productCTRL.createProduct);
//router.put("/:productId", isAuth, productCTRL.updateProduct);
router.put("/:productId", productCTRL.updateProduct);
//router.delete("/:productId", isAuth, productCTRL.deleteProduct);
router.delete("/:productId", productCTRL.deleteProduct);

module.exports = router;
