const express = require("express");
const router = express.Router();
const { validateRequest, verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");

// console.log("validateRequest:", validateRequest); // Debugging statement
// console.log("verifySignUp:", verifySignUp); // Debugging statement

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

// Login route
router.post("/login", [validateRequest.validateLogin], authController.login);

module.exports = router;
