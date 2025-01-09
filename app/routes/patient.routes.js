const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const patientController = require("../controllers/patient.controller");
const upload = require("../middlewares/fileUpload");

router.post(
  "/registerPatientInformation",
  [authJwt.verifyToken, authJwt.checkPatient, upload.array("files")],
  patientController.registerPatientInformation
);

router.get(
  "/file/:fileId",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.getFile
);

router.post(
  "/bookAppointment",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.bookAppointment
);

router.get(
  "/search/doctors",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.searchDoctors
);

router.get(
  "/advice",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.getMedicalAdvice
);
module.exports = router;
