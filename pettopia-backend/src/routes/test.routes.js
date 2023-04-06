const router = require("express").Router();

const testCTRL = require("../controllers/test.controller");


router.get("/", testCTRL.getRows);

module.exports = router;
