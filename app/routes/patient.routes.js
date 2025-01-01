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

router.get("/file/:fileId", patientController.getFile);

router.post(
  "/bookAppointment/:userId",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.bookAppointment
);

router.get(
  "/search/doctors/:userId",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.searchDoctors
);

router.get(
  "/advice/:userId",
  [authJwt.verifyToken, authJwt.checkPatient],
  patientController.getMedicalAdvice
);
module.exports = router;
