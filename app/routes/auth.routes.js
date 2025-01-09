const express = require("express");
const router = express.Router();
const { validateRequest, verifySignUp, authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");

// Signup route
router.post(
  "/signup",
  [
    validateRequest.validateSignup,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRoleExisted,
  ],
  authController.signup
);

router.post("/login", [validateRequest.validateLogin], authController.login);
router.get("/hello",(req, res)=>{
  res.json({
    mes :"here"
  })
});

router.post("/logout", [authJwt.verifyToken], authController.logout);

module.exports = router;
