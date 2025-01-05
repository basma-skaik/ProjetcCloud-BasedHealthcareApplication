const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const {authJwt} = require("../middlewares")

router.put('/update/:userId',[authJwt.verifyToken, authJwt.checkAdmin], adminController.updateUserInfo)

module.exports = router;