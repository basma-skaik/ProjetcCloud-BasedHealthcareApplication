const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const patientController = require("../controllers/patient.controller");
const upload = require("../middlewares/fileUpload");

router.post(
  "/registerPatientInformation/:userId",
  [authJwt.verifyToken, authJwt.checkPatient, upload.array("files")],
  patientController.registerPatientInformation
);

module.exports = router;
