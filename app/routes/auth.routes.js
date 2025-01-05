const express = require("express");
const router = express.Router();
const { validateRequest, verifySignUp, authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
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

// // Approve user (Admin functionality)
// router.post(
//   "/admin/approve-user/:userId",
//   // [authJwt.verifyToken, authJwt.checkAdmin],
//   adminController.approveUser
// );

//admin login
router.post(
  "/admin/login",
  [validateRequest.validateLogin],
  authController.login
);

// Login route
router.post("/login", [validateRequest.validateLogin], authController.login);

module.exports = router;
