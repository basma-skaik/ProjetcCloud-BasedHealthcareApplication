const express = require("express");
const router = express.Router();
const { validateRequest, verifySignUp, authJwt } = require("../middlewares");
const adminController = require("../controllers/admin.controller");

// Approve user (Admin functionality)
router.post(
  "/admin/approve-user/:userId",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.approveUser
);

router.put(
  "/update/:userId",
  [authJwt.verifyToken, authJwt.checkAdmin],
  adminController.updateUserInfo
);

module.exports = router;
