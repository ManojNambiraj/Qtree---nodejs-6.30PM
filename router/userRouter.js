const router = require("express").Router();
const authenticate = require("../Auth/auth");
const userController = require("../controller/userController");

router.post("/createUsers", userController.createUser);
router.get("/users", authenticate, userController.users);
router.get("/user/:id", userController.user);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;
