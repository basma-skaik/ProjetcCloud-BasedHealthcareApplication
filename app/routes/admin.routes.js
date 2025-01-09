const express = require("express");
const router = express.Router();
const { validateRequest, authJwt } = require("../middlewares");
const adminController = require("../controllers/admin.controller");
const authController = require("../controllers/auth.controller");

//admin login
router.post("/login", [validateRequest.validateLogin], authController.login);

// Approve user (Admin functionality)
router.post(
  "/approve-user/:userId",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.approveUser
);

router.put(
  "/update/:userId",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.updateUserInfo
);

router.put(
  "/delete/:userId",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.deleteUserInfo
);

router.get(
  "/getUserInfo",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.getUserInfo
);

module.exports = router;
