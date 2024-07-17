const router = require("express").Router();
const AuthController = require("./controllers/auth-controllers")
const AuthService = require("./services/auth-service");
const UserModel = require("./model/user-model");

const authService = new AuthService(UserModel);
const authController = new AuthController(authService);

router.post("/auth/sign-up", (req, res, next) =>
    authController.signUp(req, res, next)
);
router.post("/auth/login", (req, res, next) =>
    authController.login(req, res, next)
);
module.exports = router;
