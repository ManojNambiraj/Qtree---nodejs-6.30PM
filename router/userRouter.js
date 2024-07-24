const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/demo", userController.createUser);

module.exports = router;