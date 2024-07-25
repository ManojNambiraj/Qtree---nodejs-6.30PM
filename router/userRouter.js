const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/createUsers", userController.createUser);
router.get("/users", userController.users)

module.exports = router;