const router = require("express").Router();
const AuthController = require("./controllers/auth-controllers")
const authConroller = new AuthController();

router.post("/api/sign-up", authConroller.signup);

module.exports = router;
